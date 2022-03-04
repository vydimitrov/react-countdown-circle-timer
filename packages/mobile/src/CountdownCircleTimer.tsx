import React from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useCountdown, getWrapperStyle, timeStyle } from '@countdown/shared'
import type { Props } from '@countdown/shared'

const CountdownCircleTimer = (props: Props) => {
  const { children, duration, strokeLinecap, trailColor, trailStrokeWidth } =
    props
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
    <View style={getWrapperStyle(size) as StyleProp<ViewStyle>}>
      <Svg width={size} height={size}>
        <Path
          d={path}
          fill="none"
          stroke={trailColor ?? '#d9d9d9'}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        {elapsedTime !== duration && (
          <Path
            d={path}
            fill="none"
            stroke={stroke}
            strokeLinecap={strokeLinecap ?? 'round'}
            strokeWidth={strokeWidth}
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
      {typeof children === 'function' && (
        <View style={timeStyle as StyleProp<ViewStyle>}>
          {children({ remainingTime, elapsedTime, color: stroke })}
        </View>
      )}
    </View>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer, useCountdown }
