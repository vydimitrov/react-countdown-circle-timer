import React from 'react'
import renderer from 'react-test-renderer'

import { DefsLinearGradient } from '../components'

const fixture = {
  colors: [['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']],
  gradientId: '123-abc',
}

describe('snapshot tests', () => {
  it('renders with default tags', () => {
    const tree = renderer.create(<DefsLinearGradient {...fixture} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with custom tags', () => {
    const defs = () => null
    const linearGradient = () => null
    const stop = () => null

    const tree = renderer
      .create(
        <DefsLinearGradient
          {...fixture}
          defs={defs}
          stop={stop}
          linearGradient={linearGradient}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
