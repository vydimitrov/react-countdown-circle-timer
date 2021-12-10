import React, { useEffect, useState } from 'react'
import { Text, Animated, StyleSheet } from 'react-native'
import { timeStyle } from '@countdown-circle-timer/shared'

const styles = StyleSheet.create({
  time: timeStyle,
  ariaTime: { height: 0, opacity: 0 },
})

export const TimeWrapper = (props) => {
  const {
    children,
    animatedElapsedTime,
    duration,
    renderAriaTime,
    animatedColor,
  } = props

  const [timeProps, setTimeProps] = useState({
    remainingTime: duration,
    elapsedTime: 0,
    animatedColor,
  })

  useEffect(() => {
    const animatedListenerId = animatedElapsedTime.addListener(({ value }) => {
      const elapsedTime = value / 1000
      setTimeProps({
        remainingTime: Math.ceil(duration - elapsedTime),
        elapsedTime,
        animatedColor,
      })
    })

    return () => {
      animatedElapsedTime.removeListener(animatedListenerId)
    }
  }, [animatedElapsedTime, animatedColor, duration])

  return (
    <>
      {children !== null && (
        <Animated.View
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
          style={styles.time}
        >
          {React.isValidElement(children)
            ? React.cloneElement(React.Children.only(children), timeProps)
            : children(timeProps)}
        </Animated.View>
      )}
      {typeof renderAriaTime === 'function' && (
        <Text
          accessibilityRole="timer"
          accessibilityLiveRegion="assertive"
          importantForAccessibility="yes"
          style={styles.ariaTime}
        >
          {renderAriaTime(timeProps)}
        </Text>
      )}
    </>
  )
}
