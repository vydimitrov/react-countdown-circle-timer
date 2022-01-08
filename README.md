# React/React Native Countdown Circle Timer

React/React Native countdown timer component in a circle shape with color and progress animation.

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

:zap: Performance optimized with single `requestAnimationFrame` loop to animate color and progress
:rainbow: Transition between colors during the countdown
:european_castle: Fully customizable content in the center of the circle
:rocket: Support iOS and Android

## React

[![npm](https://img.shields.io/npm/v/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![npm](https://img.shields.io/npm/dw/react-countdown-circle-timer)](https://www.npmtrends.com/react-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=web)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/web/src)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-countdown-circle-timer)](https://bundlephobia.com/result?p=react-countdown-circle-timer)

```
yarn add react-countdown-circle-timer
```

## React Native

[![npm](https://img.shields.io/npm/v/react-native-countdown-circle-timer)](https://www.npmjs.com/package/react-native-countdown-circle-timer)
[![npm](https://img.shields.io/npm/dw/react-native-countdown-circle-timer)](https://www.npmtrends.com/react-native-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=mobile)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/mobile/src)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-native-countdown-circle-timer)](https://bundlephobia.com/result?p=react-native-countdown-circle-timer)

```
yarn add react-native-countdown-circle-timer
```

This component has a peer dependency on `react-native-svg` to draw the countdown circle. `react-native-svg` has to be installed and linked into your project

## Demo

### React

Check the demo on CodeSandbox to get started  
[![Edit stoic-cache-e7cie](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stoic-cache-e7cie?fontsize=14&hidenavigation=1&theme=dark)

## Basic usage

```jsx
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={7}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)
```

### React Native

Check the [Expo Snack](https://snack.expo.io/@dimitrov/countdown-circle-timer?platform=ios) demo to get started

## Basic usage

```jsx
import { Text } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={7}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => <Text>{remainingTime}</Text>}
  </CountdownCircleTimer>
)
```

### Hook

Both the React and React Native packages export a hook `useCountdown`, which accepts the same props as the component and returns all props needed to render your own circle.

```jsx
import { useCountdown } from 'react-countdown-circle-timer'

const {
  path,
  pathLength,
  stroke,
  strokeDashoffset,
  remainingTime,
  elapsedTime,
  size,
  strokeWidth,
} = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })
```

## Props for both React/React Native

| Prop Name            | Type                                                                                             | Default         | Description                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duration             | number                                                                                           | _required_      | Countdown duration in seconds                                                                                                                                                                                                                                                                                                 |
| colors               | string \| [color HEX: string, transition duration: number 0 ~ 1][]                               | _required_      | Single color as a string in HEX format or an array of tuples: 1st param - color in HEX format; 2nd param - time to transition to next color represented as a fraction of the total duration                                                                                                                                   |
| initialRemainingTime | number                                                                                           | -               | Sets the initial remaining time when the countdown starts. By default the countdown starts at the duration provided.                                                                                                                                                                                                          |
| size                 | number                                                                                           | 180             | Width and height of the SVG element                                                                                                                                                                                                                                                                                           |
| strokeWidth          | number                                                                                           | 12              | Path stroke width                                                                                                                                                                                                                                                                                                             |
| strokeLinecap        | round \| square                                                                                  | round           | Path stroke line cap                                                                                                                                                                                                                                                                                                          |
| trailColor           | string                                                                                           | #d9d9d9         | Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.)                                                                                                                                                                                                                                                      |
| trailStrokeWidth     | number                                                                                           | -               | Trail path stroke width. If not set, the `strokeWidth` is used instead.                                                                                                                                                                                                                                                       |
| rotation             | clockwise \| counterclockwise                                                                    | clockwise       | Progress path rotation direction                                                                                                                                                                                                                                                                                              |
| isPlaying            | boolean                                                                                          | false           | Play and pause animation                                                                                                                                                                                                                                                                                                      |
| \* isLinearGradient  | boolean                                                                                          | false           | \* Applies linear gradient on top of the circle. The gradient doesn't follow the circle path. Works best with two colors.                                                                                                                                                                                                     |
| gradientUniqueKey    | string                                                                                           | -               | Unique ID for the linearGradient element. It takes random ID if it's not provided.                                                                                                                                                                                                                                            |
| children             | ReactNode \| function({ remainingTime: number, elapsedTime: number }): number\|string\|ReactNode | -               | Render function or component to customize the time/content in the center of the circle. The content is centered using flexbox.                                                                                                                                                                                                |
| onComplete           | function(totalElapsedTime: number): void \| [shouldRepeat: boolean, delay: number]               | -               | On complete handler. It can be used to repeat the countdown by returning an array where the first element `shouldRepeat` indicates if the loop should start over and second element `delay` specifies the delay before looping again in milliseconds. The callback receives as an argument the total elapsed time in seconds. |
| ariaLabel            | string                                                                                           | Countdown timer | Aria label for the whole component                                                                                                                                                                                                                                                                                            |
| renderAriaTime       | function({ remainingTime: number, elapsedTime: number }): string                                 | -               | Render prop function to customize the text message that will be read by the screen reader during the countdown.                                                                                                                                                                                                               |

## Browser support

The component and hook support [all modern browsers](https://caniuse.com/?search=es6) targeting `es6`. Internet Explorer (IE) is not longer supported.

## Recipes

### Changing `duration` prop

Once the component is mounted the `duration` prop can be changed the the timer will respect the new duration. In case the new duration is bigger than the previous one then the timer will continue to the new duration. In case the new duration is smaller then the previous one then the timer will ne over. If you want to restart the timer when the duration changes then pass a new `key` prop to `CountdownCircleTimer` component and the timer will start over with the new values provided.

### Restart/Reset timer at any given time

Pass a `key` prop to `CountdownCircleTimer` and change the `key` when the timer should be restarted. Check [this demo](https://codesandbox.io/s/tender-bogdan-qd35m) to find out one possible implementation.

### Repeat timer when countdown is completed

Return an object from `onComplete` handler, which indicates if the animation should be repeated. Example:

```jsx
const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={10}
    colors="#A30000"
    onComplete={() => {
      // do your stuff here
      return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
    }}
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
    colors="#A30000"
  />
)
```

In the example above, the countdown will start at 15 seconds (one quarter before it's done) and it will animate for 15 seconds until reaches 0.

### Time formatting functions

`children` prop of `CountdownCircleTimer` component will receive as a prop `remainingTime` in seconds. Below are a few functions that can be used to get different time formatting:

- Format `mm:ss` (minutes and seconds)

```js
const children = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  return `${minutes}:${seconds}`
}
```

- Format `hh:mm:ss` (hours, minutes and seconds)

```js
const children = ({ remainingTime }) => {
  const hours = Math.floor(remainingTime / 3600)
  const minutes = Math.floor((remainingTime % 3600) / 60)
  const seconds = remainingTime % 60

  return `${hours}:${minutes}:${seconds}`
}
```

### Add `a11y` support

There are 2 things that has to be done here:

- Wrapper the timer in an element and add the following attribute `aria-label={your-aria-label}`
- Add the following element with `role="timer"` to your `children` function that will make the screen reader read the remaining time while the timer is running.

```jsx
const children = ({ remainingTime }) => (
  <div role="timer" aria-live="assertive">
    {remainingTime} seconds
  </div>
)
```

### Add gradient

Define the SVG gradient outside the Timer component and pass the gradient ID to the Timer component as a single color:

```jsx
<svg>
  <defs>
    <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
      <stop offset="5%" stopColor="gold" />
      <stop offset="95%" stopColor="red" />
    </linearGradient>
  </defs>
</svg>
<CountdownCircleTimer colors="url(#your-unique-id)">
  {({ remainingTime }) => remainingTime}
</CountdownCircleTimer>
```

### Web - slide down time animation

<img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

Check the CodeSandbox below to find out how you can implement it yourself  
[![Edit silly-night-d3s70](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/silly-night-d3s70?fontsize=14&hidenavigation=1&theme=dark)

### Web - days, hours, minutes, seconds countdown

<img src="https://user-images.githubusercontent.com/10707142/80909463-efd2cf80-8d28-11ea-8592-a179f49ac4ba.gif" width="500">

Check the demo below for one possible solution  
[![Edit musing-davinci-mqssz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-davinci-mqssz?fontsize=14&hidenavigation=1&theme=dark)
