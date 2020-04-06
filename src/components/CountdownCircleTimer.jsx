import React, { useEffect, useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useElapsedTime } from 'use-elapsed-time'
import {
  uuid,
  linearEase,
  getWrapperStyle,
  getTimeStyle,
  svgStyle,
  getPath,
  getNormalizedColors,
  getStroke,
  colorsValidator,
  visuallyHidden,
  getPathTotalLength,
} from '../utils'

const getGradientId = (isLinearGradient, gradientUniqueKey) =>
  isLinearGradient
    ? `countdown-circle-timer-gradient-${gradientUniqueKey || uuid()}`
    : ''

const getStartAt = (initialRemainingTime, startAtSeconds, durationSeconds) => {
  if (typeof initialRemainingTime === 'number') {
    return (durationSeconds - initialRemainingTime) * 1000
  }

  return startAtSeconds ? startAtSeconds * 1000 : 0
}

const CountdownCircleTimer = (props) => {
  const {
    size,
    strokeWidth,
    trailColor,
    durationSeconds,
    isPlaying,
    colors,
    strokeLinecap,
    renderTime,
    isLinearGradient,
    gradientUniqueKey,
    onComplete,
    ariaLabel,
    renderAriaTime,
    initialRemainingTime,
    startAt: startAtSeconds,
  } = props

  const pathRef = useRef(null)
  const [pathTotalLength, setPathTotalLength] = useState(0)

  // useElapsedTime will make this component rerender on every frame.
  // We memo all props that need to be computed to avoid doing that on every render
  const path = useMemo(() => getPath(size, strokeWidth), [size, strokeWidth])
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

  useEffect(() => {
    const totalLength = getPathTotalLength(pathRef.current)
    setPathTotalLength(totalLength)
  }, [])

  const elapsedTime = useElapsedTime(isPlaying, {
    durationMilliseconds,
    onComplete,
    startAt,
  })
  const strokeDashoffset = linearEase(
    elapsedTime,
    0,
    pathTotalLength,
    durationMilliseconds
  ).toFixed(2)
  const stroke = getStroke(normalizedColors, elapsedTime)
  const remainingTime = Math.ceil((durationMilliseconds - elapsedTime) / 1000)

  return (
    <div style={getWrapperStyle(size)} aria-label={ariaLabel}>
      <svg
        width={size}
        height={size}
        style={svgStyle}
        xmlns="http://www.w3.org/2000/svg"
      >
        {isLinearGradient && (
          <defs>
            <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
              {normalizedColors.map((color) => (
                <stop {...color.gradient} />
              ))}
            </linearGradient>
          </defs>
        )}
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke={trailColor}
          d={path}
        />
        <path
          fill="none"
          stroke={isLinearGradient ? `url(#${gradientId})` : stroke}
          d={path}
          ref={pathRef}
          strokeLinecap={strokeLinecap}
          strokeWidth={pathTotalLength === 0 ? 0 : strokeWidth}
          strokeDasharray={pathTotalLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {typeof renderTime === 'function' && (
        <div aria-hidden="true" style={getTimeStyle(stroke, size)}>
          {renderTime(remainingTime, elapsedTime, isPlaying)}
        </div>
      )}
      {typeof renderAriaTime === 'function' && (
        <div role="timer" aria-live="assertive" style={visuallyHidden}>
          {renderAriaTime(remainingTime, elapsedTime, isPlaying)}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.propTypes = {
  durationSeconds: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.arrayOf(colorsValidator).isRequired)
    .isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  isPlaying: PropTypes.bool,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  renderTime: PropTypes.func,
  isLinearGradient: PropTypes.bool,
  gradientUniqueKey: PropTypes.string,
  onComplete: PropTypes.func,
  ariaLabel: PropTypes.string,
  renderAriaTime: PropTypes.func,
  initialRemainingTime: PropTypes.number,
  startAt: PropTypes.number, // To be removed in next major release v.2 use initialRemainingTime instead
}

CountdownCircleTimer.defaultProps = {
  size: 180,
  strokeWidth: 12,
  trailColor: '#d9d9d9',
  isPlaying: false,
  strokeLinecap: 'round',
  isLinearGradient: false,
  ariaLabel: 'Countdown timer',
  startAt: 0,
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer }
