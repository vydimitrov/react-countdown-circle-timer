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
    colors={[
      ['#004777', 0.33],
      ['#F7B801', 0.33],
      ['#A30000', 0.33],
    ]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)
```

## Props

Refer to the [list of props](https://github.com/vydimitrov/react-countdown-circle-timer#props-for-both-reactreact-native)

## Recipes

### Slide down time animation

<img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

Check the CodeSandbox below to find out how you can implement it yourself  
[![Edit silly-night-d3s70](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/silly-night-d3s70?fontsize=14&hidenavigation=1&theme=dark)

### Days, hours, minutes, seconds countdown

<img src="https://user-images.githubusercontent.com/10707142/80909463-efd2cf80-8d28-11ea-8592-a179f49ac4ba.gif" width="500">

Check the demo below for one possible solution  
[![Edit musing-davinci-mqssz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-davinci-mqssz?fontsize=14&hidenavigation=1&theme=dark)

### Add `a11y` support

There are 2 things that has to be done here:

- Wrapper the timer in an element and add the following attribute `aria-label={your-aria-label}`
- Add the following element with `role="timer"` to your `children` function that will make the screen reader read the remaining time while the timer is running. Make sure to [visually hide](https://css-tricks.com/inclusively-hidden/) the element.

```tsx
<div role="timer" aria-live="assertive">
  {remainingTime} seconds
</div>
```

### Add gradient

The SVG gradient should be defined outside the Timer component pass to it as a single color:

```tsx
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
