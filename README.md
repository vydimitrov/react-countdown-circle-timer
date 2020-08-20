# React/React Native Countdown Circle Timer

React/React Native countdown timer component in a circle shape with color and progress animation.

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

- Countdown animation independently optimized for the Web and Mobile
- Transition between colors during the countdown
- Fully customizable content in the center of the circle
- `a11y` support
- Built-in and ready-to-use TypeScript type definitions.

## React
[![npm](https://img.shields.io/npm/dw/react-countdown-circle-timer)](https://www.npmtrends.com/react-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=web)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/web/src)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-countdown-circle-timer)](https://bundlephobia.com/result?p=react-countdown-circle-timer)

```
yarn add react-countdown-circle-timer
```

Check out the [full documentation](https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/web#react-countdown-circle-timer) for demos and use cases.

## React Native
[![npm](https://img.shields.io/npm/dw/react-native-countdown-circle-timer)](https://www.npmtrends.com/react-native-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=mobile)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/mobile/src)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-native-countdown-circle-timer)](https://bundlephobia.com/result?p=react-native-countdown-circle-timer)
```
yarn add react-native-countdown-circle-timer
```

This component has a peer dependency on `react-native-svg`. Read the [full documentation](https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/mobile#react-native-countdown-circle-timer) for the installation guide, as well as demos and use cases.

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
| rotation             | clockwise \| counterclockwise                                                                    | clockwise       | Progress path rotation direction                                                                                                                                                                                                                                                                                              |
| isPlaying            | boolean                                                                                          | false           | Play and pause animation                                                                                                                                                                                                                                                                                                      |
| \* isLinearGradient  | boolean                                                                                          | false           | \* Apples linear gradient on top of the circle. The gradient doesn't follow the circle path. Works best with two colors.                                                                                                                                                                                                      |
| gradientUniqueKey    | string                                                                                           | -               | Unique ID for the linearGradient element. It takes random ID if it's not provided.                                                                                                                                                                                                                                            |
| children             | ReactNode \| function({ remainingTime: number, elapsedTime: number }): number\|string\|ReactNode | -               | Render function or component to customize the time/content in the center of the circle. The content is centered using flexbox.                                                                                                                                                                                                |
| onComplete           | function(totalElapsedTime: number): void \| [shouldRepeat: boolean, delay: number]               | -               | On complete handler. It can be used to repeat the countdown by returning an array where the first element `shouldRepeat` indicates if the loop should start over and second element `delay` specifies the delay before looping again in milliseconds. The callback receives as an argument the total elapsed time in seconds. |
| ariaLabel            | string                                                                                           | Countdown timer | Aria label for the whole component                                                                                                                                                                                                                                                                                            |
| renderAriaTime       | function({ remainingTime: number, elapsedTime: number }): string                                 | -               | Render prop function to customize the text message that will be read by the screen reader during the countdown.                                                                                                                                                                                                               |

## Recipes

### Change `duration` and/or `initialRemainingTime` once component is mounted

Once the component is mounted `duration` and `initialRemainingTime` can not be changed to avoid any issues computing colors and progress. To set new values for any of the two props just pass a new `key` prop to `CountdownCircleTimer` component and the timer will start over with the new values provided.

### Restart/Reset timer at any given time

Pass a `key` prop to `CountdownCircleTimer` and change the `key` when the timer should be restarted. Check [this demo](https://codesandbox.io/s/tender-bogdan-qd35m) to find out one possible implementation.

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
    colors="#A30000"
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

`children` prop of `CountdownCircleTimer` component will receive as a prop `remainingTime` in seconds. Below are few function that can be used to get different time formatting:

- Format `mm:ss` (minutes and seconds)

```js
const children = ({ remainingTime }) => {
  const minutes = Math.floor((remainingTime % 3600) / 60)
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
