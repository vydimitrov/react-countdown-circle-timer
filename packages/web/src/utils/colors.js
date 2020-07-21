import { linearEase } from '.'

const getRGBStyle = ({ r, g, b, opacity }) =>
  `rgba(${r}, ${g}, ${b}, ${opacity})`

export const getColorsRGB = (colors) =>
  colors.map((color) => {
    const rgb = color[0]
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16))

    return [{ r: rgb[0], g: rgb[1], b: rgb[2], opacity: 1 }, color[1]]
  })

const getColorsBase = (colors, isGradient) => {
  const colorsRGB = getColorsRGB(colors)
  if (!isGradient) {
    return colorsRGB
  }

  // add gradient props
  let colorsTotalDurationPct = 0
  return colorsRGB.map((color, index) => {
    const isLastColor = colorsRGB.length === index + 1
    let offset = '0%'

    if (index > 0) {
      const prevColorDuration = colorsRGB[index - 1][1]
      const offsetPct = Math.round(prevColorDuration * 100)
      colorsTotalDurationPct += offsetPct

      if (colorsTotalDurationPct > 100 || isLastColor) {
        colorsTotalDurationPct = 100
        offset = '100%'
      } else {
        offset = `${colorsTotalDurationPct}%`
      }
    }

    const gradient = { offset, stopColor: getRGBStyle(color[0]), key: index }
    return [{ ...color[0], gradient }, color[1]]
  })
}

export const getNormalizedColors = (colors, duration, isGradient) => {
  const allColors = typeof colors === 'string' ? [[colors, 1]] : colors
  const colorsBase = getColorsBase(allColors, isGradient)
  let colorsTotalDuration = 0

  return colorsBase.map((color, index) => {
    const isLastColor = colorsBase.length === index + 1
    if (colorsTotalDuration >= duration || isLastColor) {
      colorsTotalDuration = duration
      return { ...color[0], colorEndTime: colorsTotalDuration }
    }

    const colorStartTime = colorsTotalDuration
    const colorEndTimeTemp =
      color[1] !== undefined ? colorStartTime + color[1] * duration : duration
    const colorEndTime =
      colorEndTimeTemp >= duration ? duration : colorEndTimeTemp

    const nextColor = colorsBase[index + 1][0]
    const goals = {
      goalR: nextColor.r - color[0].r,
      goalG: nextColor.g - color[0].g,
      goalB: nextColor.b - color[0].b,
    }

    colorsTotalDuration = colorEndTime

    return {
      ...color[0],
      ...goals,
      colorStartTime,
      colorEndTime,
      duration: colorEndTime - colorStartTime,
    }
  })
}

export const getStroke = (normalizedColors, elapsedTime) => {
  if (normalizedColors.length === 1) {
    return getRGBStyle(normalizedColors[0])
  }

  const color = normalizedColors.find(
    ({ colorEndTime }) => elapsedTime <= colorEndTime
  )
  if (color.duration === undefined) {
    return getRGBStyle(color)
  }

  const currentColorStartTime = elapsedTime - color.colorStartTime
  const r =
    linearEase(currentColorStartTime, color.r, color.goalR, color.duration) | 0
  const g =
    linearEase(currentColorStartTime, color.g, color.goalG, color.duration) | 0
  const b =
    linearEase(currentColorStartTime, color.b, color.goalB, color.duration) | 0

  return getRGBStyle({ r, g, b, opacity: color.opacity })
}
