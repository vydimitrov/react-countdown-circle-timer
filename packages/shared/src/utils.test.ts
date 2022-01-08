import { getIsColorBetweenColors, getWrapperStyle } from '..'

describe('getIsColorBetweenColors', () => {
  it('returns true when a color is between colors', () => {
    const color = 'rgb(210,80,165)'
    const start = 'rgb(230,60,140)'
    const end = 'rgb(195,90,200)'

    expect(getIsColorBetweenColors(color, start, end)).toBeTruthy()
  })

  it('returns false when a color is not between colors', () => {
    // middle value is not between the other two
    const color = 'rgb(210,80,165)'
    const start = 'rgb(230,60,140)'
    const end = 'rgb(195,40,200)'

    expect(getIsColorBetweenColors(color, start, end)).toBeFalsy()
  })
})

describe('getWrapperStyle', () => {
  it('returns the correct styles for given size', () => {
    expect(getWrapperStyle(120)).toEqual({
      position: 'relative',
      width: 120,
      height: 120,
    })
  })
})
