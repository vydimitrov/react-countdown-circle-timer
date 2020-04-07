import React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { CountdownCircleTimer } from '../src'

Math.random = () => 0.124578

const useElapsedTime = require('use-elapsed-time')

const fixture = {
  durationSeconds: 10,
  colors: [['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']],
}

describe('snapshot tests', () => {
  it('renders', () => {
    const tree = renderer.create(<CountdownCircleTimer {...fixture} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with time', () => {
    const tree = renderer
      .create(
        <CountdownCircleTimer
          {...fixture}
          renderAriaTime={(value) => value}
          renderTime={(value) => value}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('functional tests', () => {
  afterEach(() => {
    useElapsedTime.__resetElapsedTime()
  })

  it('should set styles correctly on the root', () => {
    render(<CountdownCircleTimer {...fixture} size={240} />)

    expect(screen.getByLabelText('Countdown timer')).toHaveStyle(`
            position: relative;
            width: 240px;
            height: 240px;
            margin: 0 auto;
        `)
  })

  it('should set aria-label attribute', () => {
    render(<CountdownCircleTimer {...fixture} ariaLabel="Nedtællingsur" />)

    expect(screen.getByLabelText('Nedtællingsur')).toBeInTheDocument()
  })

  it('should set width, height and style attributes on the svg element', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} size={360} />
    )

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '360')
    expect(svg).toHaveAttribute('height', '360')
    expect(svg).toHaveStyle(`
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        `)
  })

  it('should add linearGradient tag with the ID provided when isLinearGradient is true', () => {
    const { container } = render(
      <CountdownCircleTimer
        {...fixture}
        isLinearGradient
        gradientUniqueKey="test"
      />
    )

    const linearGradient = container.querySelector('linearGradient')
    expect(linearGradient).toBeInTheDocument()
    expect(linearGradient).toHaveAttribute(
      'id',
      'countdown-circle-timer-gradient-test'
    )
  })

  it('should add linearGradient tag with random ID when an ID is not provided and isLinearGradient is true', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} isLinearGradient />
    )

    const linearGradient = container.querySelector('linearGradient')
    expect(linearGradient).toBeInTheDocument()
    expect(linearGradient).toHaveAttribute(
      'id',
      'countdown-circle-timer-gradient-4hgb79ur1xg'
    )
  })

  it('should set stroke-width, stroke, and d attributes on the trail path', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} strokeWidth={13} trailColor="#CCC" />
    )

    const path = container.querySelector('path')
    expect(path).toHaveAttribute('stroke-width', '13')
    expect(path).toHaveAttribute('stroke', '#CCC')
    const d = path
      .getAttribute('d')
      .replace(/\r?\n|\r/g, '')
      .replace(/\s+/g, ' ')
    expect(d).toBe('m 90,6.5 a 83.5,83.5 0 1,0 0,167 a 83.5,83.5 0 1,0 0,-167')
  })

  it('should set stroke-width, stroke-linecap, stroke-dasharray, and d attributes on the path that animates', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} strokeWidth={13} />
    )

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-width', '13')
    expect(path).toHaveAttribute('stroke-linecap', 'round')
    expect(path).toHaveAttribute('stroke-dasharray', '524.6459731494955')
    const d = path
      .getAttribute('d')
      .replace(/\r?\n|\r/g, '')
      .replace(/\s+/g, ' ')
    expect(d).toBe('m 90,6.5 a 83.5,83.5 0 1,0 0,167 a 83.5,83.5 0 1,0 0,-167')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the beginning of the animation', () => {
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '0.000')
    expect(path).toHaveAttribute('stroke', 'rgba(0, 71, 119, 1)')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the middle of the animation', () => {
    useElapsedTime.__setElapsedTime(5000)
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '263.894')
    expect(path).toHaveAttribute('stroke', 'rgba(203, 89, 0, 1)')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the end of the animation', () => {
    useElapsedTime.__setElapsedTime(10000)
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '527.788')
    expect(path).toHaveAttribute('stroke', 'rgba(163, 0, 0, 1)')
  })

  it('should the same color at the beginning and end of the animation if only one color is provided', () => {
    useElapsedTime.__setElapsedTime(0)

    const expectedPathProps = ['stroke', 'rgba(0, 71, 119, 1)']
    const component = (
      <CountdownCircleTimer {...fixture} colors={[['#004777']]} />
    )
    const { container, rerender } = render(component)

    const pathBeginning = container.querySelectorAll('path')[1]
    expect(pathBeginning).toHaveAttribute(...expectedPathProps)

    useElapsedTime.__setElapsedTime(10000)
    rerender(component)

    const pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute(...expectedPathProps)
  })

  it('should set stroke as the gradient Id on the path that animates if isLinearGradient is true', () => {
    const { container } = render(
      <CountdownCircleTimer
        {...fixture}
        isLinearGradient
        gradientUniqueKey="test"
      />
    )

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute(
      'stroke',
      'url(#countdown-circle-timer-gradient-test)'
    )
  })

  it('should render the time', () => {
    useElapsedTime.__setElapsedTime(8000)
    const renderTime = (value) => `${value} seconds remaining`

    render(<CountdownCircleTimer {...fixture} renderTime={renderTime} />)

    const time = screen.getByText('2 seconds remaining')
    expect(time).toBeInTheDocument()
    expect(time).toHaveStyle(`
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 180px;
            height: 180px;
            color: rgba(163, 0, 0, 1);
        `)
  })

  it('should render the aria time', () => {
    useElapsedTime.__setElapsedTime(3000)
    const renderAriaTime = (value) => `${value} seconds`

    render(
      <CountdownCircleTimer {...fixture} renderAriaTime={renderAriaTime} />
    )

    expect(screen.getByText('7 seconds')).toBeInTheDocument()
  })

  it('should pass isPlaying and config options to useElapsedTime', () => {
    const isPlaying = true
    const startAt = 3.6

    render(
      <CountdownCircleTimer
        {...fixture}
        startAt={startAt}
        isPlaying={isPlaying}
      />
    )

    expect(useElapsedTime.__getIsPlaying()).toBe(true)
    expect(useElapsedTime.__getConfig()).toEqual({
      durationMilliseconds: 10000,
      onComplete: undefined,
      startAt: 3600,
    })

    useElapsedTime.__resetIsPlaying()
    useElapsedTime.__resetConfig()
  })

  it('should set startAt prop on useElapsedTime based on the initial remaining time', () => {
    const isPlaying = true
    const initialRemainingTime = 7

    render(
      <CountdownCircleTimer
        {...fixture}
        initialRemainingTime={initialRemainingTime}
        isPlaying={isPlaying}
      />
    )

    expect(useElapsedTime.__getIsPlaying()).toBe(true)
    expect(useElapsedTime.__getConfig()).toEqual({
      durationMilliseconds: 10000,
      onComplete: undefined,
      startAt: 3000,
    })

    useElapsedTime.__resetIsPlaying()
    useElapsedTime.__resetConfig()
  })
})

describe('behaviour tests', () => {
  it('should fire onComplete', () => {
    const onComplete = jest.fn()

    render(<CountdownCircleTimer {...fixture} onComplete={onComplete} />)

    useElapsedTime.__fireOnComplete()

    expect(onComplete).toHaveBeenCalled()

    useElapsedTime.__resetConfig()
  })
})
