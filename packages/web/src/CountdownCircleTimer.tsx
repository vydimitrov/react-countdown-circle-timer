import React from 'react'
import { getWrapperStyle, timeStyle } from '@countdown-circle-timer/shared'
import { useCountdown } from './useCountdown'
import type { Props } from './types'

export const CountdownCircleTimer = (props: Props) => {
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
      <div style={{ ...timeStyle, color: stroke }}>
        {children?.({ remainingTime, elapsedTime })}
      </div>
    </div>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'
