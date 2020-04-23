# React Native Countdown Circle Timer for iOS and Android

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
