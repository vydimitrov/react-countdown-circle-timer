import React from 'react'
import PropTypes from 'prop-types'
import { useElapsedTime } from 'use-elapsed-time'
import {
  linearEase,
  getWrapperStyle,
  timeStyle,
  getStroke,
  colorsValidator,
  visuallyHidden,
  useMemoizedProps,
} from '@countdown-circle-timer/shared'

const CountdownCircleTimer = (props) => {
  const {
    size,
    strokeWidth,
    trailColor,
    duration,
    isPlaying,
    colors,
    strokeLinecap,
    children,
    isLinearGradient,
    gradientUniqueKey,
    onComplete,
    ariaLabel,
    renderAriaTime,
    initialRemainingTime,
  } = props

  const {
    path,
    pathLength,
    durationMilliseconds,
    startAt,
    normalizedColors,
    gradientId,
  } = useMemoizedProps({
    size,
    strokeWidth,
    duration,
    initialRemainingTime,
    colors,
    isLinearGradient,
    gradientUniqueKey,
  })

  const elapsedTime = useElapsedTime(isPlaying, {
    durationMilliseconds,
    onComplete,
    startAt,
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

  return (
    <div style={getWrapperStyle(size)} aria-label={ariaLabel}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
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
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {children !== null && (
        <div aria-hidden="true" style={{ ...timeStyle, color: stroke }}>
          {React.isValidElement(children)
            ? React.cloneElement(React.Children.only(children), timeProps)
            : children(timeProps)}
        </div>
      )}
      {typeof renderAriaTime === 'function' && (
        <div role="timer" aria-live="assertive" style={visuallyHidden}>
          {renderAriaTime(timeProps)}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.propTypes = {
  duration: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(colorsValidator).isRequired)
    .isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  isPlaying: PropTypes.bool,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  isLinearGradient: PropTypes.bool,
  gradientUniqueKey: PropTypes.string,
  onComplete: PropTypes.func,
  ariaLabel: PropTypes.string,
  renderAriaTime: PropTypes.func,
  initialRemainingTime: PropTypes.number,
}

CountdownCircleTimer.defaultProps = {
  size: 180,
  strokeWidth: 12,
  trailColor: '#d9d9d9',
  isPlaying: false,
  strokeLinecap: 'round',
  isLinearGradient: false,
  ariaLabel: 'Countdown timer',
  children: null,
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer }
