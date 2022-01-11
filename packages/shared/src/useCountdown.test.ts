import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { getIsColorBetweenColors } from './utils'
import type { Props } from './types'

import { useCountdown } from '..'
import { ColorRGB } from './types'

describe('useCountdown', () => {
  it('returns default values when hook renders', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 12, colors: '#f1f2f3' })
    )

    expect(result.current).toEqual({
      elapsedTime: 0,
      path: 'm 90,6 a 84,84 0 1,0 0,168 a 84,84 0 1,0 0,-168',
      pathLength: 527.7875658030853,
      remainingTime: 12,
      rotation: 'clockwise',
      size: 180,
      stroke: '#f1f2f3',
      strokeDashoffset: 0,
      strokeWidth: 12,
    })
  })

  it('sets the path correctly when rotation is counterclockwise', () => {
    const { result } = renderHook(() =>
      useCountdown({
        duration: 12,
        colors: '#f1f2f3',
        rotation: 'counterclockwise',
      })
    )

    expect(result.current.rotation).toBe('counterclockwise')
    expect(result.current.path).toBe(
      'm 90,6 a 84,84 0 0,1 0,168 a 84,84 0 0,1 0,-168'
    )
  })

  it('transitions between colors when multiple colors are provided', async () => {
    const startColor = 'rgb(66,135,245)'
    const middleOneColor = 'rgb(15,188,191)'
    const middleTwoColor = 'rgb(66,245,99)'
    const endColor = 'rgb(201,201,12)'

    const { result } = renderHook(() =>
      useCountdown({
        isPlaying: true,
        duration: 0.6,
        colors: ['#4287f5', '#0fbcbf', '#42f563', '#c9c90c'],
        colorsTime: [0.6, 0.4, 0.2, 0],
      })
    )

    expect(result.current.elapsedTime).toBe(0)

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.1)
      expect(
        getIsColorBetweenColors(
          result.current.stroke as ColorRGB,
          startColor,
          middleOneColor
        )
      ).toBeTruthy()
    })

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.3)
      expect(
        getIsColorBetweenColors(
          result.current.stroke as ColorRGB,
          middleOneColor,
          middleTwoColor
        )
      ).toBeTruthy()
    })

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.5)
      expect(
        getIsColorBetweenColors(
          result.current.stroke as ColorRGB,
          middleTwoColor,
          endColor
        )
      ).toBeTruthy()
    })

    await waitFor(() => expect(result.current.stroke).toBe(endColor))
  })

  it('does not transition between colors when isSmoothColorTransition is false', async () => {
    const colors: Props['colors'] = [
      '#4287f5',
      '#0fbcbf',
      '#42f563',
      '#c9c90c',
      '#c9c90c',
    ]
    const { result } = renderHook(() =>
      useCountdown({
        isPlaying: true,
        duration: 0.6,
        colors,
        colorsTime: [0.6, 0.4, 0.2, 0.05, 0],
        isSmoothColorTransition: false,
      })
    )

    expect(result.current.elapsedTime).toBe(0)
    expect(result.current.stroke).toBe(colors[0])

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.1)
      expect(result.current.stroke).toBe(colors[0])
    })

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.3)
      expect(result.current.stroke).toBe(colors[1])
    })

    await waitFor(() => {
      expect(result.current.elapsedTime).toBeGreaterThan(0.5)
      expect(result.current.stroke).toBe(colors[2])
    })

    await waitFor(() => expect(result.current.stroke).toBe(colors[3]))
  })

  it('returns 0 for elapsedTime when the duration is set to 0 and ignores the initialRemainingTime', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 0, colors: '#ccc', initialRemainingTime: 10 })
    )

    expect(result.current.elapsedTime).toBe(0)
  })

  it('returns the first color if the color time can not be found fo the current color', async () => {
    const { result } = renderHook(() =>
      useCountdown({
        isPlaying: true,
        duration: 0.4,
        colors: ['#ccc', '#ddd', '#fff'],
        colorsTime: [0.4, 0.2], // colorsTime does not cover the time from 0.2 to 0
      })
    )

    await waitFor(() => expect(result.current.elapsedTime).toBeGreaterThan(0.3))
    expect(result.current.stroke).toBe('#ccc') // show first color since no match with colorsTime
  })

  it('fires onUpdate when the remainingTime changes', async () => {
    const onUpdate = jest.fn()
    renderHook(() =>
      useCountdown({
        isPlaying: true,
        duration: 2,
        colors: '#ccc',
        onUpdate,
      })
    )

    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith(2))
    await waitFor(() => expect(onUpdate).toHaveBeenLastCalledWith(1), {
      timeout: 2000,
    })
    await waitFor(() => expect(onUpdate).toHaveBeenLastCalledWith(0), {
      timeout: 2000,
    })
  })
})
