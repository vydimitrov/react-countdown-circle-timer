import React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { CountdownCircleTimer } from '../src'

Math.random = () => 0.124578

const useElapsedTime = require('use-elapsed-time')

const fixture = {
  duration: 10,
  colors: [
    ['#004777', 0.33],
    ['#F7B801', 0.33],
    ['#A30000', 0.33],
  ],
}

describe('snapshot tests', () => {
  it('renders', () => {
    const tree = renderer.create(<CountdownCircleTimer {...fixture} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with time', () => {
    const renderTime = ({ remainingTime }) => remainingTime
    const tree = renderer
      .create(
        <CountdownCircleTimer {...fixture} renderAriaTime={renderTime}>
          {renderTime}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with different trail stroke width', () => {
    const renderTime = ({ remainingTime }) => remainingTime
    const tree = renderer
      .create(
        <CountdownCircleTimer {...fixture} trailStrokeWidth={16}>
          {renderTime}
        </CountdownCircleTimer>
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
        `)
  })

  it('should set aria-label attribute', () => {
    render(<CountdownCircleTimer {...fixture} ariaLabel="Nedtællingsur" />)

    expect(screen.getByLabelText('Nedtællingsur')).toBeInTheDocument()
  })

  it('should set width and height attributes on the svg element', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} size={360} />
    )

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '360')
    expect(svg).toHaveAttribute('height', '360')
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

  it('should set the path that animates to "counterclockwise" rotation when rotation prop is "counterclockwise"', () => {
    const { container } = render(
      <CountdownCircleTimer
        {...fixture}
        strokeWidth={13}
        rotation="counterclockwise"
      />
    )

    const path = container.querySelectorAll('path')[1]
    const d = path
      .getAttribute('d')
      .replace(/\r?\n|\r/g, '')
      .replace(/\s+/g, ' ')
    expect(d).toBe('m 90,6.5 a 83.5,83.5 0 0,1 0,167 a 83.5,83.5 0 0,1 0,-167')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the beginning of the animation', () => {
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '0')
    expect(path).toHaveAttribute('stroke', 'rgba(0, 71, 119, 1)')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the middle of the animation', () => {
    useElapsedTime.__setElapsedTime(5)
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '263.89378290154264')
    expect(path).toHaveAttribute('stroke', 'rgba(203, 89, 0, 1)')
  })

  it('should set stroke and stroke-dashoffset on the path that animates at the end of the animation', () => {
    useElapsedTime.__setElapsedTime(10)
    const { container } = render(<CountdownCircleTimer {...fixture} />)

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '527.7875658030853')
    expect(path).toHaveAttribute('stroke', 'rgba(163, 0, 0, 1)')
  })

  it('should the same color at the beginning and end of the animation if only one color in an array of colors is provided', () => {
    useElapsedTime.__setElapsedTime(0)

    const expectedPathProps = ['stroke', 'rgba(0, 71, 119, 1)']
    const component = () => (
      <CountdownCircleTimer {...fixture} colors={[['#004777']]} />
    )
    const { container, rerender } = render(component())

    const pathBeginning = container.querySelectorAll('path')[1]
    expect(pathBeginning).toHaveAttribute(...expectedPathProps)

    useElapsedTime.__setElapsedTime(10)
    rerender(component())

    const pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute(...expectedPathProps)
  })

  it('should the same color at the beginning and end of the animation if only one color as a string is provided', () => {
    useElapsedTime.__setElapsedTime(0)

    const expectedPathProps = ['stroke', 'rgba(0, 71, 119, 1)']
    const component = () => (
      <CountdownCircleTimer {...fixture} colors="#004777" />
    )
    const { container, rerender } = render(component())

    const pathBeginning = container.querySelectorAll('path')[1]
    expect(pathBeginning).toHaveAttribute(...expectedPathProps)

    useElapsedTime.__setElapsedTime(10)
    rerender(component())

    const pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute(...expectedPathProps)
  })

  it('should transition colors for which the durations sums up to 1', () => {
    useElapsedTime.__setElapsedTime(0)

    const component = () => (
      <CountdownCircleTimer
        {...fixture}
        colors={[
          ['#fff', 0.6],
          ['#ccc', 0.6], // all colors after this one should be ignored since transition duration is >= 1
          ['#000', 0.4],
        ]}
      />
    )
    const { container, rerender } = render(component())

    const pathBeginning = container.querySelectorAll('path')[1]
    expect(pathBeginning).toHaveAttribute('stroke', 'rgba(255, 255, 255, 1)')

    useElapsedTime.__setElapsedTime(9.9)
    rerender(component())

    let pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute('stroke', 'rgba(5, 5, 5, 1)')

    useElapsedTime.__setElapsedTime(10)
    rerender(component())

    pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute('stroke', 'rgba(0, 0, 0, 1)')
  })

  it('should use the first color without duration to fill in the whole duration. All color after that one should just be shown in the end - edge case', () => {
    useElapsedTime.__setElapsedTime(3)

    const component = () => (
      <CountdownCircleTimer
        {...fixture}
        colors={[['#fff', 0.3], ['#ccc'], ['#000']]} // color #ccc fills in duration and color #000 is shown at the end
      />
    )

    const { container, rerender } = render(component())

    const pathBeginning = container.querySelectorAll('path')[1]
    expect(pathBeginning).toHaveAttribute('stroke', 'rgba(204, 204, 204, 1)')

    useElapsedTime.__setElapsedTime(9.9)
    rerender(component())

    let pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute('stroke', 'rgba(2, 2, 2, 1)')

    useElapsedTime.__setElapsedTime(10)
    rerender(component())

    pathEnd = container.querySelectorAll('path')[1]
    expect(pathEnd).toHaveAttribute('stroke', 'rgba(0, 0, 0, 1)')
  })

  it('should set stroke of the path that animates correctly when the colors are shorthanded', () => {
    const { container } = render(
      <CountdownCircleTimer
        {...fixture}
        colors={[['#abc', 0.45], ['#fa4', 0.45], ['#ccc']]}
      />
    )

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke', 'rgba(170, 187, 204, 1)')
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

  it('should add correct styles to the time wrapper', () => {
    useElapsedTime.__setElapsedTime(8)

    render(
      <CountdownCircleTimer {...fixture}>
        {({ remainingTime }) => `${remainingTime} seconds remaining`}
      </CountdownCircleTimer>
    )

    const time = screen.getByText('2 seconds remaining')
    expect(time).toHaveStyle(`
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            color: rgba(163, 0, 0, 1);
        `)
  })

  it('should render the time when the children prop is a function', () => {
    useElapsedTime.__setElapsedTime(8)

    render(
      <CountdownCircleTimer {...fixture}>
        {({ remainingTime }) => `${remainingTime} seconds remaining`}
      </CountdownCircleTimer>
    )

    const time = screen.getByText('2 seconds remaining')
    expect(time).toBeInTheDocument()
  })

  it('should render the time when the children prop is a component', () => {
    useElapsedTime.__setElapsedTime(8)

    const TimeComponent = ({ remainingTime, format }) => (
      <div>
        {remainingTime} {format} remaining
      </div>
    )

    render(
      <CountdownCircleTimer {...fixture}>
        <TimeComponent format="seconds" />
      </CountdownCircleTimer>
    )

    const time = screen.getByText('2 seconds remaining')
    expect(time).toBeInTheDocument()
  })

  it('should render the aria time', () => {
    useElapsedTime.__setElapsedTime(3)
    const renderAriaTime = ({ remainingTime }) => `${remainingTime} seconds`

    render(
      <CountdownCircleTimer {...fixture} renderAriaTime={renderAriaTime} />
    )

    expect(screen.getByText('7 seconds')).toBeInTheDocument()
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
      duration: 10,
      onComplete: undefined,
      startAt: 3,
    })

    useElapsedTime.__resetIsPlaying()
    useElapsedTime.__resetConfig()
  })

  it('should not change the duration and startAt if new values for them are provided after the component is mounted', () => {
    const initialRemainingTime = 7
    const { rerender } = render(
      <CountdownCircleTimer
        {...fixture}
        initialRemainingTime={initialRemainingTime}
      />
    )

    const expectedOptions = {
      duration: 10,
      onComplete: undefined,
      startAt: 3,
    }

    expect(useElapsedTime.__getConfig()).toEqual(expectedOptions)

    rerender(
      <CountdownCircleTimer
        {...fixture}
        duration={4}
        initialRemainingTime={2}
      />
    )

    expect(useElapsedTime.__getConfig()).toEqual(expectedOptions)

    useElapsedTime.__resetIsPlaying()
    useElapsedTime.__resetConfig()
  })

  it('should set strokeDasharray to the total path length if the duration provided is 0', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} duration={0} />
    )

    const path = container.querySelectorAll('path')[1]
    expect(path).toHaveAttribute('stroke-dashoffset', '527.7875658030853')
  })

  it('should set statAt prop to 0 if the duration provided is 0', () => {
    render(
      <CountdownCircleTimer
        {...fixture}
        duration={0}
        initialRemainingTime={4}
      />
    )

    const { duration, startAt } = useElapsedTime.__getConfig()

    expect(duration).toBe(0)
    expect(startAt).toBe(0)
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

  it('should pass as an argument the total elapsed time in seconds to onComplete callback', () => {
    const onComplete = jest.fn()

    render(<CountdownCircleTimer {...fixture} onComplete={onComplete} />)

    useElapsedTime.__fireOnComplete(3.612, 'second argument')

    expect(onComplete).toHaveBeenCalledWith(3.612, 'second argument')

    useElapsedTime.__resetConfig()
  })

  it('should set trail stroke width', () => {
    const { container } = render(
      <CountdownCircleTimer {...fixture} trailStrokeWidth={14} />
    )

    const path = container.querySelector('path')
    expect(path).toHaveAttribute('stroke-width', '14')
  })
  
})
