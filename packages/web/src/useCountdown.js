import { useMemo, useRef } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import {
  getPathProps,
  getStartAt,
  getGradientId,
  getWrapperStyle,
  timeStyle,
} from '@countdown-circle-timer/shared'
import {
  linearEase,
  getNormalizedColors,
  getStroke,
  visuallyHidden,
} from '../utils'

export const useCountdown = ({
  isPlaying,
  size,
  strokeWidth,
  duration: initDuration,
  initialRemainingTime,
  colors,
  isLinearGradient,
  gradientUniqueKey,
  onComplete,
  rotation,
}) => {
  // time related props can NOT be changed once the component is mounted because animation relays on elapsed time since the timer is running
  // to change them pass a new value to the "key" prop of the component, which will reinitialize/restart the timer and use the new props
  const { duration, startAt } = useRef({
    duration: initDuration,
    startAt: getStartAt(initialRemainingTime, initDuration),
  }).current

  // useElapsedTime will cause the component to re-render on every frame.
  // We memo all props that need to be computed to avoid doing that on every render
  const { path, pathLength } = useMemo(
    () => getPathProps(size, strokeWidth, rotation),
    [size, strokeWidth, rotation]
  )

  const normalizedColors = useMemo(
    () => getNormalizedColors(colors, duration, isLinearGradient),
    [colors, duration, isLinearGradient]
  )

  const gradientId = useMemo(() => getGradientId(gradientUniqueKey), [
    gradientUniqueKey,
  ])

  const { elapsedTime } = useElapsedTime(isPlaying, {
    duration,
    startAt,
    onComplete:
      typeof onComplete === 'function'
        ? (...rest) => {
            // REFACTOR in next major release so onComplete matches expected return value as useElapsedTime
            const [shouldRepeat = false, delay = 0] = onComplete(...rest) || []

            return { shouldRepeat, delay: delay / 1000, newStartAt: 0 }
          }
        : undefined,
  })

  return {
    path,
    pathLength,
    gradientId,
    stroke: getStroke(normalizedColors, elapsedTime),
    strokeDashoffset: linearEase(elapsedTime, 0, pathLength, duration),
    timeProps: {
      remainingTime: Math.ceil(duration - elapsedTime),
      elapsedTime,
    },
    styles: {
      wrapperStyle: getWrapperStyle(size),
      timeStyle,
      visuallyHidden,
    },
  }
}
