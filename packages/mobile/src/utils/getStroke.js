export const getStroke = ({
  colors,
  animatedElapsedTime,
  durationMilliseconds,
}) => {
  const colorsLength = colors.length

  if (colorsLength === 1) {
    return colors[0][0]
  }

  let colorsTotalDuration = 0

  const inputRange = colors.map(([_, duration], index) => {
    const isLastColor = colorsLength === index + 1
    if (colorsTotalDuration >= durationMilliseconds || isLastColor) {
      return durationMilliseconds
    }

    const colorEndTimeTemp =
      duration !== undefined
        ? colorsTotalDuration + duration * durationMilliseconds
        : durationMilliseconds - colorsTotalDuration
    const colorEndTime =
      colorEndTimeTemp >= durationMilliseconds
        ? durationMilliseconds
        : colorEndTimeTemp

    colorsTotalDuration = colorEndTime

    return colorEndTime
  })

  const outputRange = colors.map(([color]) => color)

  return animatedElapsedTime.interpolate({
    inputRange: [0, ...inputRange],
    outputRange: [...outputRange, colors[colorsLength - 1][0]],
  })
}
