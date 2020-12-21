import React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import { render, act } from '@testing-library/react-native'

import { CountdownCircleTimer } from '../src'

Math.random = () => 0.124578

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
    const tree = renderer
      .create(
        <CountdownCircleTimer
          {...fixture}
          renderAriaTime={({ remainingTime }) => remainingTime}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with single color', () => {
    const tree = renderer
      .create(
        <CountdownCircleTimer duration={5} colors={[['#004777', 1]]}>
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with single color provided as a string', () => {
    const tree = renderer
      .create(
        <CountdownCircleTimer duration={5} colors="#004777">
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with gradient', () => {
    const tree = renderer
      .create(
        <CountdownCircleTimer
          duration={5}
          colors={[
            ['#004777', 0.4],
            ['#aabbcc', 0.6],
          ]}
          isLinearGradient
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('functional tests', () => {
  it('should start the timer from value provided in initialRemainingTime', () => {
    const { getByText } = render(
      <CountdownCircleTimer {...fixture} initialRemainingTime={3.7}>
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    )

    expect(getByText('4')).toBeTruthy()
  })

  it('should call onComplete at the end of the countdown', () => {
    global.withAnimatedTimeTravelEnabled(() => {
      const onComplete = jest.fn()
      const { getByText } = render(
        <CountdownCircleTimer {...fixture} isPlaying onComplete={onComplete}>
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )

      act(() => {
        global.timeTravel(10000)
      })

      expect(getByText('0')).toBeTruthy()
      expect(onComplete).toHaveBeenCalledWith(10)
    })
  })
})

describe('behaviour tests', () => {
  it('should call onComplete at the end of the countdown', () => {
    global.withAnimatedTimeTravelEnabled(() => {
      const onComplete = jest.fn()
      const { getByText } = render(
        <CountdownCircleTimer {...fixture} isPlaying onComplete={onComplete}>
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )

      act(() => {
        global.timeTravel(10000)
      })

      expect(getByText('0')).toBeTruthy()
      expect(onComplete).toHaveBeenCalledWith(10)
    })
  })

  it('should repeat the countdown when onComplete return an array with shouldRepeat = true', () => {
    global.withAnimatedTimeTravelEnabled(() => {
      const duration = 1
      const shouldRepeat = true
      const onComplete = jest.fn().mockReturnValueOnce([shouldRepeat])
      const component = (isPlaying) => (
        <CountdownCircleTimer
          {...fixture}
          duration={duration}
          isPlaying={isPlaying}
          onComplete={onComplete}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      const { getByText, rerender } = render(component(true))

      act(() => {
        global.timeTravel(1000)
      })

      expect(getByText('0')).toBeTruthy()
      expect(onComplete).toHaveBeenCalledWith(1)

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(getByText('1')).toBeTruthy()
      rerender(component(false))
    })
  })

  it('should clear repeat timeout when the component is unmounted', () => {
    const clearTimeoutMock = jest.fn()

    global.clearTimeout = clearTimeoutMock

    const { unmount } = render(<CountdownCircleTimer {...fixture} />)

    unmount()

    expect(clearTimeoutMock).toHaveBeenCalled()
  })
})
