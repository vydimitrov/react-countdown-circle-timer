import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { getIsColorBetweenColors } from '@countdown/shared'

import { CountdownCircleTimer, useCountdown } from '.'
import type { Props } from '.'

const fixture: Props = {
  duration: 0.2,
  colors: '#abc',
}

type ColorRGB = `rgb(${string})`

describe('CountdownCircleTimer', () => {
  const getAnimatingPath = () => document.querySelectorAll('path')[1]

  it('sets styles correctly on the root', () => {
    render(<CountdownCircleTimer {...fixture} size={240} />)

    const root = document.querySelector('svg')?.parentElement
    expect(root).toHaveStyle(`
        position: relative;
        width: 240px;
        height: 240px;
    `)
  })

  it('sets width and height attributes on the svg element', () => {
    render(<CountdownCircleTimer {...fixture} size={360} />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '360')
    expect(svg).toHaveAttribute('height', '360')
  })

  it('sets stroke-width, stroke, and d attributes on the trail path', () => {
    render(
      <CountdownCircleTimer {...fixture} strokeWidth={13} trailColor="#ccc" />
    )

    const path = document.querySelectorAll('path')[0]
    expect(path).toHaveAttribute('stroke-width', '13')
    expect(path).toHaveAttribute('stroke', '#ccc')
    expect(path).toHaveAttribute(
      'd',
      'm 90,6.5 a 83.5,83.5 0 1,0 0,167 a 83.5,83.5 0 1,0 0,-167'
    )
  })

  it('sets stroke-width, stroke-linecap, stroke-dasharray, and d attributes on the path that animates', () => {
    render(<CountdownCircleTimer {...fixture} strokeWidth={13} />)

    const path = getAnimatingPath()
    expect(path).toHaveAttribute('stroke-width', '13')
    expect(path).toHaveAttribute('stroke-linecap', 'round')
    expect(path).toHaveAttribute('stroke-dasharray', '524.6459731494955')
    expect(path).toHaveAttribute(
      'd',
      'm 90,6.5 a 83.5,83.5 0 1,0 0,167 a 83.5,83.5 0 1,0 0,-167'
    )
  })

  it('sets stroke-linecap attribute on the path that animates when provided', () => {
    render(<CountdownCircleTimer {...fixture} strokeLinecap="square" />)

    const path = getAnimatingPath()
    expect(path).toHaveAttribute('stroke-linecap', 'square')
  })

  it('sets the animating path to "counterclockwise" rotation when rotation prop is "counterclockwise"', () => {
    render(
      <CountdownCircleTimer
        {...fixture}
        strokeWidth={13}
        rotation="counterclockwise"
      />
    )

    const path = getAnimatingPath()
    expect(path).toHaveAttribute(
      'd',
      'm 90,6.5 a 83.5,83.5 0 0,1 0,167 a 83.5,83.5 0 0,1 0,-167'
    )
  })

  it('sets trail stroke width', () => {
    render(<CountdownCircleTimer {...fixture} trailStrokeWidth={14} />)

    const path = document.querySelectorAll('path')[0]
    expect(path).toHaveAttribute('stroke-width', '14')
  })

  it('sets stroke and stroke-dashoffset correctly on the animating path when providing a single color', async () => {
    const onComplete = jest.fn()
    render(
      <CountdownCircleTimer {...fixture} isPlaying onComplete={onComplete} />
    )

    const path = getAnimatingPath()
    // start of the animation
    expect(path).toHaveAttribute('stroke-dashoffset', '0')
    expect(path).toHaveAttribute('stroke', '#abc')

    await waitFor(() => expect(onComplete).toHaveBeenCalled())

    // end of the animation
    expect(path).toHaveAttribute('stroke-dashoffset', '527.7875658030853')
    expect(path).toHaveAttribute('stroke', '#abc')
  })

  it('sets stroke and stroke-dashoffset correctly on the animating path when providing multiple colors', async () => {
    const onComplete = jest.fn()
    const startColor = 'rgb(126,126,126)' // #e7e7e7
    const middleColor = 'rgb(255,255,255)' // #fff
    const endColor = 'rgb(0,0,0)' // #000

    render(
      <CountdownCircleTimer
        duration={0.3}
        colors={['#7e7e7e', '#fff', '#000']}
        colorsTime={[0.3, 0.15, 0]}
        isPlaying
        onComplete={onComplete}
      />
    )

    const path = getAnimatingPath()
    // start of the animation
    expect(path).toHaveAttribute('stroke-dashoffset', '0')
    expect(path).toHaveAttribute('stroke', 'rgb(126,126,126)')

    // Check if color is transitioning between the start and middle colors close to the start of the animation
    await waitFor(() => {
      const dashoffset = parseInt(path.getAttribute('stroke-dashoffset') ?? '0')
      expect(dashoffset).toBeGreaterThan(100)
      const stroke = path.getAttribute('stroke') as ColorRGB
      expect(
        getIsColorBetweenColors(stroke, startColor, middleColor)
      ).toBeTruthy()
    })

    // Check if color is transitioning between the middle and end colors close to the end of the animation
    await waitFor(() => {
      const dashoffset = parseInt(path.getAttribute('stroke-dashoffset') ?? '0')
      expect(dashoffset).toBeGreaterThan(400)
      const stroke = path.getAttribute('stroke') as ColorRGB
      expect(
        getIsColorBetweenColors(stroke, middleColor, endColor)
      ).toBeTruthy()
    })

    await waitFor(() => expect(onComplete).toHaveBeenCalled())

    // end of the animation
    expect(path).toHaveAttribute('stroke-dashoffset', '527.7875658030853')
    expect(path).toHaveAttribute('stroke', 'rgb(0,0,0)')
  })

  it('renders children and adds correct styles to the children wrapper', () => {
    render(
      <CountdownCircleTimer duration={2} colors="#f1f2f3">
        {({ remainingTime }) => `${remainingTime} seconds remaining`}
      </CountdownCircleTimer>
    )

    const time = screen.getByText('2 seconds remaining')
    expect(time).toBeVisible()
    expect(time).toHaveStyle(`
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    `)
  })

  it('respects the startAt prop at the start of the animation', () => {
    render(
      <CountdownCircleTimer duration={7} colors="#abc" initialRemainingTime={4}>
        {({ remainingTime, color }) => (
          <div style={{ color }}>{`${remainingTime} seconds`}</div>
        )}
      </CountdownCircleTimer>
    )

    const time = screen.getByText('4 seconds')
    expect(time).toBeVisible()
    expect(time).toHaveStyle(`
      color: #abc;
    `)
  })
})

describe('useCountdown', () => {
  it('returns default values form useCountdown', () => {
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
})
