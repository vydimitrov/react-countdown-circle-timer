# React Native Countdown Circle Timer

[![npm](https://img.shields.io/npm/v/react-native-countdown-circle-timer)](https://www.npmjs.com/package/react-native-countdown-circle-timer)
[![Codecov](https://img.shields.io/codecov/c/github/vydimitrov/react-countdown-circle-timer?flag=mobile)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer/tree/master/packages/mobile/src)
[![npm](https://img.shields.io/npm/dw/react-native-countdown-circle-timer)](https://www.npmtrends.com/react-native-countdown-circle-timer)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-countdown-circle-timer/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-countdown-circle-timer)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-native-countdown-circle-timer)](https://bundlephobia.com/result?p=react-native-countdown-circle-timer)

React Native countdown timer component for iOS and Android in a circle shape with color and progress animation.

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

- Single `react-native`'s `Animated` loop to animate color and progress
- Support iOS and Android
- Transition between colors during the countdown
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

Check the [Expo Snack](https://snack.expo.io/@dimitrov/countdown-circle-timer?platform=ios) demo to get started

## Basic usage

```jsx
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={10}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
)
```

## Props

Refer to the [list of props](https://github.com/vydimitrov/react-countdown-circle-timer#props-for-both-reactreact-native)

## Road Map

- Add liner gradient support for iOS
- Support `useNativeDriver`
