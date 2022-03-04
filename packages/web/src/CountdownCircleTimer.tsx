import React from 'react'
import { useCountdown, getWrapperStyle, timeStyle } from '@countdown/shared'
import type { Props } from '@countdown/shared'

const CountdownCircleTimer = (props: Props) => {
  const { children, strokeLinecap, trailColor, trailStrokeWidth } = props
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown(props)

  return (
    <div style={getWrapperStyle(size)}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <path
          d={path}
          fill="none"
          stroke={trailColor ?? '#d9d9d9'}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeLinecap={strokeLinecap ?? 'round'}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {typeof children === 'function' && (
        <div style={timeStyle}>
          {children({ remainingTime, elapsedTime, color: stroke })}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer, useCountdown }
