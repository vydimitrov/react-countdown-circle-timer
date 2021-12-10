import React from 'react'
import { View, Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { TimeWrapper } from './components'
import { useCountdown } from './hooks'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const CountdownCircleTimer = ({
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
    styles,
    gradientId,
    animatedElapsedTime,
    animatedStroke,
    strokeDashoffset,
    durationMilliseconds,
    isProgressPathVisible,
  } = useCountdown({
    isPlaying,
    duration,
    size,
    // https://github.com/vydimitrov/react-countdown-circle-timer/pull/82#issuecomment-774961578
    // Find the larger strokeWidth and calculate the path.
    strokeWidth: Math.max(strokeWidth, trailStrokeWidth ?? 0),
    colors,
    initialRemainingTime,
    onComplete,
    gradientUniqueKey,
    rotation,
  })

  return (
    <View
      style={styles.wrapper}
      accessible={true}
      accessibilityLabel={ariaLabel}
    >
      <Svg width={size} height={size}>
        <Path
          fill="none"
          strokeWidth={trailStrokeWidth ?? strokeWidth}
          stroke={trailColor}
          d={path}
        />
        {isProgressPathVisible && (
          <AnimatedPath
            fill="none"
            stroke={animatedStroke}
            d={path}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
      {(children !== null || typeof renderAriaTime === 'function') && (
        <TimeWrapper
          animatedColor={animatedStroke}
          animatedElapsedTime={animatedElapsedTime}
          duration={durationMilliseconds / 1000} // durationMilliseconds is locked version of the duration
          renderAriaTime={renderAriaTime}
        >
          {children}
        </TimeWrapper>
      )}
    </View>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer }
