import { useMemo } from 'react'
import {
  getPathProps,
  getStartAt,
  getGradientId,
  getNormalizedColors,
} from '../utils'

export const useMemoizedProps = (props) => {
  const {
    size,
    strokeWidth,
    durationSeconds,
    initialRemainingTime,
    startAtSeconds,
    colors,
    isLinearGradient,
    gradientUniqueKey,
  } = props

  // useElapsedTime will make this component rerender on every frame.
  // We memo all props that need to be computed to avoid doing that on every render
  const { path, pathLength } = useMemo(() => getPathProps(size, strokeWidth), [
    size,
    strokeWidth,
  ])

  const durationMilliseconds = useMemo(() => durationSeconds * 1000, [
    durationSeconds,
  ])

  const startAt = useMemo(
    () => getStartAt(initialRemainingTime, startAtSeconds, durationSeconds),
    [initialRemainingTime, startAtSeconds, durationSeconds]
  )

  const normalizedColors = useMemo(
    () => getNormalizedColors(colors, durationMilliseconds, isLinearGradient),
    [colors, durationMilliseconds, isLinearGradient]
  )

  const gradientId = useMemo(
    () => getGradientId(isLinearGradient, gradientUniqueKey),
    [isLinearGradient, gradientUniqueKey]
  )

  return {
    path,
    pathLength,
    durationMilliseconds,
    startAt,
    normalizedColors,
    gradientId,
  }
}
