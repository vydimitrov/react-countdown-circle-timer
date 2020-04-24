import { useRef, useState, useEffect, useMemo } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import {
  getPathProps,
  getStartAt,
  getGradientId,
  getWrapperStyle,
} from '@countdown-circle-timer/shared'
import { getStroke } from '../utils'

export const useCountdown = ({
  isPlaying,
  duration,
  size,
  strokeWidth,
  colors,
  initialRemainingTime,
  onComplete,
  gradientUniqueKey,
}) => {
  const elapsedTime = useRef(0)
  const [isProgressPathVisible, setIsProgressPathVisible] = useState(true)
  const animatedElapsedTime = useRef(new Animated.Value(0)).current
  const durationMilliseconds = duration * 1000
  const { path, pathLength } = getPathProps(size, strokeWidth)
  const gradientId = useMemo(() => getGradientId(gradientUniqueKey), [
    gradientUniqueKey,
  ])
  const styles = StyleSheet.create({ wrapper: getWrapperStyle(size) })
  const animatedStroke = getStroke({
    colors,
    animatedElapsedTime,
    durationMilliseconds,
  })
  const strokeDashoffset = animatedElapsedTime.interpolate({
    inputRange: [0, durationMilliseconds],
    outputRange: [0, pathLength],
  })

  useEffect(() => {
    // set initial remaining time if it is provided
    const startAt = getStartAt(initialRemainingTime, duration)
    if (startAt) {
      elapsedTime.current = startAt
      animatedElapsedTime.setValue(startAt)
    }

    // keep track of the elapsed time
    animatedElapsedTime.addListener(({ value }) => {
      elapsedTime.current = value
    })

    return () => {
      animatedElapsedTime.removeAllListeners()
    }
  }, [])

  // toggle playing effect
  useEffect(() => {
    const animateTime = () => {
      Animated.timing(animatedElapsedTime, {
        toValue: durationMilliseconds,
        easing: Easing.linear,
        duration: durationMilliseconds - elapsedTime.current,
      }).start(({ finished }) => {
        if (finished && elapsedTime.current === durationMilliseconds) {
          setIsProgressPathVisible(false)
          if (typeof onComplete === 'function') {
            const [shouldRepeat = false, delay = 0] = onComplete() || []

            if (shouldRepeat) {
              setTimeout(() => {
                elapsedTime.current = 0
                animatedElapsedTime.resetAnimation()
                setIsProgressPathVisible(true)
                animateTime()
              }, delay)
            }
          }
        }
      })
    }

    if (isPlaying) {
      animateTime()
    }

    return () => {
      animatedElapsedTime.stopAnimation()
    }
  }, [isPlaying])

  return {
    path,
    pathLength,
    styles,
    gradientId,
    animatedElapsedTime,
    animatedStroke,
    strokeDashoffset,
    durationMilliseconds,
    isProgressPathVisible,
  }
}
