import React from 'react'
import { Text } from 'react-native'
import { render, waitFor } from '@testing-library/react-native'

import { CountdownCircleTimer } from '.'

Math.random = () => 0.124578

const fixture = {
  duration: 10,
  colors: [
    ['#004777', 0.33],
    ['#F7B801', 0.33],
    ['#A30000', 0.33],
  ],
}

describe('functional tests', () => {
  it('should start the timer from value provided in initialRemainingTime', () => {
    const { getByText } = render(
      <CountdownCircleTimer {...fixture} initialRemainingTime={3.7}>
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    )

    expect(getByText('4')).toBeTruthy()
  })
})

describe('behaviour tests', () => {
  it('should call onComplete at the end of the countdown', async () => {
    const onComplete = jest.fn()
    const { findByText } = render(
      <CountdownCircleTimer
        {...fixture}
        duration={1}
        isPlaying
        onComplete={onComplete}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    )

    expect(await findByText('0')).toBeTruthy()
    expect(onComplete).toHaveBeenCalledWith(1)
  })

  it('should clear repeat timeout when the component is unmounted', () => {
    const clearTimeoutMock = jest.fn()

    global.clearTimeout = clearTimeoutMock

    const { unmount } = render(<CountdownCircleTimer {...fixture} />)

    unmount()

    expect(clearTimeoutMock).toHaveBeenCalled()
  })
})
