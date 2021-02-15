import * as React from 'react'

export interface TimeProps {
  remainingTime?: number
  elapsedTime?: number
}

type ChildAsFunc = {
  (props: TimeProps): number | string | React.ReactNode
}

type Color = [string, number]
type Colors = {
  0: Color
} & Array<Color>

export interface CountdownCircleTimerProps {
  /** Countdown duration in seconds */
  duration: number
  /** Single color as a string or an array of tuples: 1st param - color in HEX format; 2nd param - time to transition to next color represented as a fraction of the total duration */
  colors: string | Colors
  /** Set the initial remaining time if it is different than the duration */
  initialRemainingTime?: number
  /** Width and height of the SVG element. Default: 180 */
  size?: number
  /** Path stroke width. Default: 12 */
  strokeWidth?: number
  /** Trail stroke width */
  trailStrokeWidth?: number
  /** Path stroke line cap. Default: "round" */
  strokeLinecap?: 'round' | 'square'
  /** Progress path rotation direction. Default: "clockwise" */
  rotation?: 'clockwise' | 'counterclockwise'
  /** Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.). Default: #d9d9d9 */
  trailColor?: string
  /** Play and pause animation. Default: false */
  isPlaying?: boolean
  /** Apples linear gradient on top of the circle. The gradient doesn't follow the circle path. Works best with two colors. Default: false */
  isLinearGradient?: boolean
  /** Unique ID for the linearGradient element. It takes random ID if it's not provided */
  gradientUniqueKey?: string
  /** Render function or component to customize the time/content in the center of the circle */
  children?: React.ReactNode | ChildAsFunc
  /**
   * On animation complete event handler. It can be used to restart the animation by returning an array
   * where the first element "shouldRepeat" indicates if the loop should start over
   * and second element "delay" specifies the delay before looping again in milliseconds.
   * The callback receives as an argument the total elapsed time in seconds
   *
   */
  onComplete?: (totalElapsedTime: number) => void | [boolean, number] // [shouldRepeat: boolean, delay: number]
  /** Aria label for the whole component. Default: "Countdown timer" */
  ariaLabel?: string
  /** Render prop function to customize the text message that will be read by the screen reader during the countdown */
  renderAriaTime?: (props: TimeProps) => string
}

declare const CountdownCircleTimer: React.FunctionComponent<CountdownCircleTimerProps>
export { CountdownCircleTimer }
