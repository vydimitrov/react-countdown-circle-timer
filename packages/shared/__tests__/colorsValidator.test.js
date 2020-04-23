import { colorsValidator } from '../utils'

describe('functional tests', () => {
  it('should return undefined if the color is valid HEX color', () => {
    const propValue = ['#aabbcc']
    const key = ''
    const componentName = 'CountdownCircleTimer'
    const location = ''
    const propFullName = 'colors'

    const result = colorsValidator(
      propValue,
      key,
      componentName,
      location,
      propFullName
    )

    expect(result).toBe(undefined)
  })

  it('should thrown an error if the color is not valid HEX color', () => {
    const propValue = ['aabbcc']
    const key = ''
    const componentName = 'CountdownCircleTimer'
    const location = ''
    const propFullName = 'colors'

    const result = colorsValidator(
      propValue,
      key,
      componentName,
      location,
      propFullName
    )

    expect(result.message).toBe(
      "Invalid prop 'colors[0]' supplied to 'CountdownCircleTimer'.Expect a color with HEX color code."
    )
  })

  it('should thrown an error if color transition duration is not between 0 and 1', () => {
    const propValue = ['#aabbcc', 2]
    const key = ''
    const componentName = 'CountdownCircleTimer'
    const location = ''
    const propFullName = 'colors'

    const result = colorsValidator(
      propValue,
      key,
      componentName,
      location,
      propFullName
    )

    expect(result.message).toBe(
      "Invalid prop 'colors[1]' supplied to 'CountdownCircleTimer'. Expect a number of color transition duration with value between 0 and 1."
    )
  })
})
