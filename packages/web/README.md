# React Countdown Circle Timer

[![npm](https://img.shields.io/npm/v/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![npm](https://img.shields.io/npm/dw/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-countdown-circle-timer/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-countdown-circle-timer)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-countdown-circle-timer)](https://bundlephobia.com/result?p=react-countdown-circle-timer@1.0.6)

React countdown timer component in a circle shape with color and progress animation.

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

- Performance optimized with single `requestAnimationFrame` loop to animate color and progress (no `setInterval` used)
- Transition between colors during the countdown
- Support for linear gradient
- Fully customizable content in the center of the circle
- `a11y` support
- Built-in and ready-to-use TypeScript type definitions.

## Installation

```
yarn add react-countdown-circle-timer
```

## Migrating from v1.x.x to v2.x.x?

There are a few small API changes to consider before switching to v2.x.x. Read [Migrate to v2.x.x](https://github.com/vydimitrov/react-countdown-circle-timer/blob/master/packages/web/MIGRATE_TO_V2.md) docs for more info.

## Demo

Check the demo on CodeSandbox to get started  
[![Edit stoic-cache-e7cie](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stoic-cache-e7cie?fontsize=14&hidenavigation=1&theme=dark)

## Basic usage

```jsx
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={10}
    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)
```

## Props

Refer to the [list of props](https://github.com/vydimitrov/react-countdown-circle-timer#props-for-both-reactreact-native)

## Recipes

### Restart timer at any given time

Pass a `key` prop to `CountdownCircleTimer` and change the `key` when the timer should be restarted.

### Repeat timer when countdown is completed

Return an array from `onComplete` handler, which indicates if the animation should be repeated. Example:

```jsx
const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    onComplete={() => {
      // do your stuff here
      return [true, 1500] // repeat animation in 1.5 seconds
    }}
    isPlaying
    duration={10}
    colors={[['#A30000']]}
  />
)
```

### Set the initial remaining time different then the duration provided

Pass the remaining time to `initialRemainingTime` prop. Example:

```jsx
const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={60}
    initialRemainingTime={15}
    colors={[['#A30000']]}
  />
)
```

In the example above, the countdown will start at 15 seconds (one quarter before it's done) and it will animate for 15 seconds until reaches 0.

### Slide down time animation

Here is an example on how you can achieve the animation below:  
<img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

```jsx
const renderTime = (time) => {
  const currentTime = useRef(time)
  const prevTime = useRef(null)
  const isNewTimeFirstTick = useRef(false)
  const [_, setOneLastRerender] = useState(0)

  if (currentTime.current !== time) {
    isNewTimeFirstTick.current = true
    prevTime.current = currentTime.current
    currentTime.current = time
  } else {
    isNewTimeFirstTick.current = false
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (time === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1)
    }, 20)
  }

  const isTimeUp = isNewTimeFirstTick.current

  return (
    <div className="time-wrapper">
      <div key={time} className={`time ${isTimeUp ? 'up' : ''}`}>
        {time}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? 'down' : ''}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  )
}
```

```css
.time-wrapper {
  position: relative;
  // change width and height if needed
  width: 80px;
  height: 60px;
}

.time-wrapper .time {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.2s;
}

.time-wrapper .time.up {
  opacity: 0;
  transform: translateY(-100%);
}

.time-wrapper .time.down {
  opacity: 0;
  transform: translateY(100%);
}
```

Feed the `renderTime` function above to the `CountdownCircleTimer` `children` prop and add the styles above to your stylesheet.
