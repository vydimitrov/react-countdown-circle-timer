import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, Animated, StyleSheet } from 'react-native'
import {
  countdownCircleTimerProps,
  timeStyle,
} from '@countdown-circle-timer/shared'

const styles = StyleSheet.create({
  time: timeStyle,
  ariaTime: { height: 0, opacity: 0 },
})

const TimeWrapper = (props) => {
  const {
    children,
    animatedElapsedTime,
    durationMilliseconds,
    renderAriaTime,
    animatedColor,
  } = props

  const [timeProps, setTimeProps] = useState({
    animatedElapsedTime: 0,
    remainingTime: durationMilliseconds / 1000,
    animatedColor,
  })

  useEffect(() => {
    const animatedListenerId = animatedElapsedTime.addListener(({ value }) => {
      setTimeProps({
        remainingTime: Math.ceil((durationMilliseconds - value) / 1000),
        elapsedTime: value,
        animatedColor,
      })
    })

    return () => {
      animatedElapsedTime.removeListener(animatedListenerId)
    }
  }, [animatedElapsedTime, animatedColor, durationMilliseconds])

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

TimeWrapper.propTypes = {
  durationMilliseconds: PropTypes.number.isRequired,
  animatedElapsedTime: PropTypes.object.isRequired,
  // when there is a single color we just past the color string
  // when there are more colors it is an interpolate object
  animatedColor: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: countdownCircleTimerProps.children,
  renderAriaTime: countdownCircleTimerProps.renderAriaTime,
}

export { TimeWrapper }
