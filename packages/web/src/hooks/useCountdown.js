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
  // useElapsedTime will make this component rerender on every frame.
  // We memo all props that need to be computed to avoid doing that on every render
  const { path, pathLength } = useMemo(() => getPathProps(size, strokeWidth), [
    size,
    strokeWidth,
  ])

  const durationMilliseconds = useMemo(() => duration * 1000, [duration])

  const startAt = useMemo(() => getStartAt(initialRemainingTime, duration), [
    initialRemainingTime,
    duration,
  ])

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
  ).toFixed(3)

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
