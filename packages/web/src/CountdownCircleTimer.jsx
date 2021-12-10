import React from 'react'
import { useCountdown } from './hooks'

export const CountdownCircleTimer = ({
  duration,
  colors,
  size = 180,
  strokeWidth = 12,
  trailStrokeWidth,
  trailColor = '#d9d9d9',
  isPlaying = false,
  strokeLinecap = 'round',
  ariaLabel = 'Countdown timer',
  children = null,
  rotation = 'clockwise',
  gradientUniqueKey,
  onComplete,
  renderAriaTime,
  initialRemainingTime,
}) => {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    gradientId,
    styles,
    timeProps,
  } = useCountdown({
    isPlaying,
    size,
    // https://github.com/vydimitrov/react-countdown-circle-timer/pull/82#issuecomment-774961578
    // Find the larger strokeWidth and calculate the path.
    strokeWidth: Math.max(strokeWidth, trailStrokeWidth ?? 0),
    duration,
    initialRemainingTime,
    colors,
    gradientUniqueKey,
    onComplete,
    rotation,
  })

  return (
    <div style={styles.wrapperStyle} aria-label={ariaLabel}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <path
          d={path}
          fill="none"
          stroke={trailColor}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {children !== null && (
        <div aria-hidden="true" style={{ ...styles.timeStyle, color: stroke }}>
          {React.isValidElement(children)
            ? React.cloneElement(React.Children.only(children), timeProps)
            : children(timeProps)}
        </div>
      )}
      {typeof renderAriaTime === 'function' && (
        <div role="timer" aria-live="assertive" style={styles.visuallyHidden}>
          {renderAriaTime(timeProps)}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'
