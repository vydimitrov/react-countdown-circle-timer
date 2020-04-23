# React Native Countdown Circle Timer for iOS and Android

[![npm](https://img.shields.io/npm/v/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![npm](https://img.shields.io/npm/dw/react-countdown-circle-timer)](https://www.npmjs.com/package/react-countdown-circle-timer)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-countdown-circle-timer/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-countdown-circle-timer)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-countdown-circle-timer)](https://bundlephobia.com/result?p=react-countdown-circle-timer@1.0.6)

React Native countdown timer component in a circle shape with color and progress animation.

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

- Single `react-native`'s `Animated` loop to animate color and progress
- Support iOS and Android
- Transition between colors during the countdown
- Linear gradient support(currently only by Android)
- Fully customizable content in the center of the circle
- `a11y` support
- Built-in and ready-to-use TypeScript type definitions.

## Installation

```
yarn add react-native-countdown-circle-timer
```

## Prerequisites

This component has a peer dependency on `react-native-svg` to draw the countdown circle. `react-native-svg` has to be installed and linked into your project

## Demo

Check the demo on CodeSandbox to get started  
[![Edit stoic-cache-e7cie](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stoic-cache-e7cie?fontsize=14&hidenavigation=1&theme=dark)

## Basic usage

```jsx
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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

Refer to the [list of props](https://github.com/vydimitrov/react-countdown-circle-timer#props)

## Road Map

- Add liner gradient support for iOS
- Support `useNativeDriver`
