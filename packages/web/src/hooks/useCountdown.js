import { useMemo } from 'react'
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
  duration,
  initialRemainingTime,
  colors,
  isLinearGradient,
  gradientUniqueKey,
  onComplete,
}) => {
  const styles = {
    wrapperStyle: getWrapperStyle(size),
    timeStyle,
    visuallyHidden,
  }
  // useElapsedTime will cause the component to re-render on every frame.
  // We memo all props that need to be computed to avoid doing that on every render
  const { path, pathLength } = useMemo(() => getPathProps(size, strokeWidth), [
    size,
    strokeWidth,
  ])

  // time related props can NOT be changed once the component is mounted because animation relays on elapsed time since the timer is running
  // to change them pass a new value to the "key" prop of the component, which will reinitialize/restart the timer and use the new props
  const { durationMilliseconds, startAt } = useMemo(
    () => ({
      durationMilliseconds: duration * 1000,
      startAt: getStartAt(initialRemainingTime, duration),
    }),
    [] // time related props are computed only once when component is mounted
  )

  const normalizedColors = useMemo(
    () => getNormalizedColors(colors, durationMilliseconds, isLinearGradient),
    [colors, durationMilliseconds, isLinearGradient]
  )

  const gradientId = useMemo(() => getGradientId(gradientUniqueKey), [
    gradientUniqueKey,
  ])

  const elapsedTime = useElapsedTime(isPlaying, {
    startAt,
    durationMilliseconds,
    onComplete:
      typeof onComplete === 'function'
        ? (totalElapsedTime, ...rest) =>
            // convert totalElapsedTime from milliseconds to seconds, as the duration of the countdown
            onComplete(totalElapsedTime / 1000, ...rest)
        : undefined,
  })

  const stroke = getStroke(normalizedColors, elapsedTime)
  const strokeDashoffset = linearEase(
    elapsedTime,
    0,
    pathLength,
    durationMilliseconds
  )

  const timeProps = {
    remainingTime: Math.ceil((durationMilliseconds - elapsedTime) / 1000),
    elapsedTime,
  }

  return {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    gradientId,
    styles,
    timeProps,
  }
}
