# React Countdown Circle Timer
React countdown timer component in a circle shape with color and progress animation to urge with pleasure your users. 

<img src="https://user-images.githubusercontent.com/10707142/66097204-ca68c200-e59d-11e9-9b70-688409755aaa.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65935516-a0869280-e419-11e9-9bb0-40c4d1ef2bbe.gif" width="200"> <img src="https://user-images.githubusercontent.com/10707142/65963815-cfbdf380-e45b-11e9-809d-970174e88914.gif" width="200">

* Lightweight only 8KB
* Build with 0 dependencies
* Performance optimized with single `requestAnimationFrame` loop to animate color and progress (no `setInterval` used)
* Transition between colors during the countdown
* Support for linear gradient
* Fully customizable content in the center of the circle

## Installation
```
yarn add react-countdown-circle-time
```
or
```
npm install react-countdown-circle-time
```

## Basic usage
```
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
        durationSeconds={10}
        colors={[
            ['#004777', .33],
            ['#F7B801', .33],
            ['#A30000']
        ]}
    />
);

```

## Props

| Prop Name          | Type                                                                                | Default   | Description                                                                                                                                    |
|--------------------|-------------------------------------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| durationSeconds    | string                                                                              | -         | Countdown duration in seconds                                                                                                                  |
| colors             | Array<[color HEX: string, transition duration: float number between 0 and 1]>       | -         | Array of tuples: 1st param - color in HEX format; 2nd param - time to transition to next color represented as a fraction of the total duration |
| size               | number                                                                              | 180       | Width and height of the SVG element                                                                                                            |
| strokeWidth        | number                                                                              | 12        | Path stroke width                                                                                                                              |
| strokeLinecap      | Enum{ 'round', 'square' }                                                           | 'round'   | Path stroke line cap                                                                                                                           |
| trailColor         | string                                                                              | '#d9d9d9' | Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.)                                                                       |
| isPlaying          | boolean                                                                             | false     | Play and pause animation                                                                                                                       |
| * isLinearGradient | boolean                                                                             | false     | * Apples linear gradient on top of the circle. The gradient doesn't follow the circle path. Works best with two colors.                        |
| gradientUniqueKey  | string                                                                              | -         | Unique ID for the linearGradient element. It takes random ID if it's not provided.                                                             |
| renderTime         | function(remainingTime: number, elapsedTime: number, isPlaying: boolean): ReactNode | -         | Render prop function to customize the content in the center of the circle. The content is centered using flexbox.                              |
| onComplete         | function()                                                                          | -         | On complete handler                                                                                                                            |
