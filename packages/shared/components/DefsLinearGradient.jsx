import React from 'react'
import PropTypes from 'prop-types'
import { countdownCircleTimerProps } from '..'

const getStopProps = (colors) => {
  if (colors.length === 1) {
    return [{ offset: 1, stopColor: colors[0][0], key: 0 }]
  }

  const colorsLength = colors.length
  let currentDuration = 0
  return [
    { offset: 0, stopColor: colors[0][0], key: 0 },
    ...colors.map(([stopColor, duration], index) => {
      const isLastColor = colorsLength === index + 1
      currentDuration += duration

      return {
        offset: isLastColor ? 1 : currentDuration,
        stopColor,
        key: index + 1,
      }
    }),
  ]
}

const DefsLinearGradient = ({
  gradientId,
  colors,
  defs: Defs = 'defs',
  linearGradient: LinearGradient = 'linearGradient',
  stop: Stop = 'stop',
}) => (
  <Defs>
    <LinearGradient id={gradientId} x1="1" y1="0" x2="0" y2="0">
      {getStopProps(colors).map((gradient) => (
        <Stop {...gradient} />
      ))}
    </LinearGradient>
  </Defs>
)

DefsLinearGradient.propTypes = {
  gradientId: PropTypes.string.isRequired,
  colors: countdownCircleTimerProps.colors,
  defs: PropTypes.node,
  linearGradient: PropTypes.node,
  stop: PropTypes.node,
}

export { DefsLinearGradient }
