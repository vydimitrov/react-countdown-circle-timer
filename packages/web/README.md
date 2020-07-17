# React Countdown Circle Timer

[![npm](https://img.shields.io/npm/v/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=web)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/web/src)
[![npm](https://img.shields.io/npm/dw/react-countdown-circle-timer)](https://www.npmtrends.com/react-countdown-circle-timer)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-countdown-circle-timer/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-countdown-circle-timer)](https://bundlephobia.com/result?p=react-countdown-circle-timer)

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

or

```
npm install react-countdown-circle-timer
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
    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000',0]]}
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
    colors={[['#A30000',0]]}
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
    colors={[['#A30000'],0]}
  />
)
```

In the example above, the countdown will start at 15 seconds (one quarter before it's done) and it will animate for 15 seconds until reaches 0.

### Slide down time animation

<img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

Check the CodeSandbox below to find out how you can implement it yourself  
[![Edit silly-night-d3s70](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/silly-night-d3s70?fontsize=14&hidenavigation=1&theme=dark)

### Days, hours, minutes, seconds countdown

<img src="https://user-images.githubusercontent.com/10707142/80909463-efd2cf80-8d28-11ea-8592-a179f49ac4ba.gif" width="500">

Check the demo below for one possible solution  
[![Edit musing-davinci-mqssz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-davinci-mqssz?fontsize=14&hidenavigation=1&theme=dark)
