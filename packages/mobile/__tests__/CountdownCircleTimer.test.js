import React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'

import { CountdownCircleTimer } from '../src'

Math.random = () => 0.124578

const fixture = {
  duration: 10,
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
          renderAriaTime={({ remainingTime }) => remainingTime}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
