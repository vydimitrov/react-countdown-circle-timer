import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Svg, { Path, Defs, LinearGradient } from 'react-native-svg'
import {
  linearEase,
  getWrapperStyle,
  getTimeStyle,
  getStroke,
  colorsValidator,
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

  const elapsedTime = 0
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

  const styles = StyleSheet.create({
    wrapper: getWrapperStyle(size),
    time: getTimeStyle(stroke, size),
  })

  return (
    <View
      style={styles.wrapper}
      accessible={true}
      accessibilityLabel={ariaLabel}
    >
      <Svg width={size} height={size}>
        {isLinearGradient && (
          <Defs>
            <LinearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
              {normalizedColors.map((color) => (
                <stop {...color.gradient} />
              ))}
            </LinearGradient>
          </Defs>
        )}
        <Path
          fill="none"
          strokeWidth={strokeWidth}
          stroke={trailColor}
          d={path}
        />
        <Path
          fill="none"
          stroke={isLinearGradient ? `url(#${gradientId})` : stroke}
          d={path}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {children !== null && (
        <View accessibilityElementsHidden={true} style={styles.time}>
          {React.isValidElement(children)
            ? React.cloneElement(React.Children.only(children), timeProps)
            : children(timeProps)}
        </View>
      )}
      {typeof renderAriaTime === 'function' && (
        <View accessibilityRole="timer" accessibilityLiveRegion="assertive">
          {renderAriaTime(timeProps)}
        </View>
      )}
    </View>
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
