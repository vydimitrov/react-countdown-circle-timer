const isHexColor = (color) => color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
const getErrorInProp = (propName, componentName) =>
  `Invalid prop '${propName}' supplied to '${componentName}'`
const getHexColorError = (propName, componentName, type = 'array') =>
  new Error(
    `${getErrorInProp(propName, componentName)}. Expect ${
      type === 'array' ? 'an array of tuples where the first element is a' : ''
    } HEX color code string.
 .`
  )

const validateColorsAsString = (colors, propName, componentName) => {
  if (!isHexColor(colors)) {
    return getHexColorError(propName, componentName, 'string')
  }
}

const validateColorsAsArray = (colors, propName, componentName) => {
  for (let index = 0; index < colors.length; index += 1) {
    const color = colors[index][0]
    const duration = colors[index][1]

    if (!isHexColor(color)) {
      return getHexColorError(propName, componentName)
    }

    if (!(duration === undefined || (duration >= 0 && duration <= 1))) {
      return new Error(
        `${getErrorInProp(propName, componentName)}.
        Expect an array of tuples where the second element is a number between 0 and 1 representing color transition duration.`
      )
    }
  }
}

export const colorsValidator = (props, propName, componentName) => {
  const colors = props[propName]
  if (typeof colors === 'string') {
    return validateColorsAsString(colors, propName, componentName)
  }

  return validateColorsAsArray(colors, propName, componentName)
}
