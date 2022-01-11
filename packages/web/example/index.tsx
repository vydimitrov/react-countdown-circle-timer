import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { CountdownCircleTimer } from '../src/index'

const Count = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [count, setCount] = useState(10)

  return (
    <div>
      {/* <svg>
        <defs>
          <linearGradient id="test-it" x1="1" y1="0" x2="0" y2="0">
            <stop offset="5%" stopColor="gold" />
            <stop offset="95%" stopColor="red" />
          </linearGradient>
        </defs>
      </svg> */}
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={count}
        initialRemainingTime={6}
        isSmoothColorTransition={false}
        // updateInterval={1}
        colors="#aabbcc"
        // colors="url(#test-it)"
        // colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        // colorsTime={[8, 6.66, 3.33, 0]}
        onUpdate={(remainingTime) => {
          console.log('Counter is ', count)
          console.log('Remaining time is ', remainingTime)
        }}
        onComplete={() => ({ shouldRepeat: true })}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <hr />
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        Toggle Playing
      </button>
      <button onClick={() => setCount((prev) => (prev += 5))}>Count</button>
    </div>
  )
}

ReactDOM.render(<Count />, document.querySelector('#root'))
