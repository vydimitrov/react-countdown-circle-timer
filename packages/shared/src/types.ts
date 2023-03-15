/// <reference types="react" />

type ColorHex = `#${string}`
type ColorRGBA = `rgba(${string})`
type ColorURL = `url(#${string})`
export declare type ColorRGB = `rgb(${string})`
export declare type ColorFormat = ColorHex | ColorRGB | ColorRGBA | ColorURL

type TimeProps = {
  remainingTime: number
  elapsedTime: number
  color: ColorFormat
}

type SingleColor = {
  /** Single valid color or url to a gradient */
  colors: ColorFormat
  /** Colors time works only when the colors prop is an array of colors*/
  colorsTime?: never
}

type MultipleColors = {
  /** Array of colors in HEX format. At least 2 colors should be provided */
  colors: { 0: ColorHex } & { 1: ColorHex } & ColorHex[]
  /** Indicates the time when a color should switch to the next color. The first item should be the duration and the last one should be 0/goal. Example with duration of 10 seconds: [10, 6, 3, 0]  */
  colorsTime: { 0: number } & { 1: number } & number[]
}

type OnComplete = {
  /** Indicates if the loop should start over. Default: false */
  shouldRepeat?: boolean
  /** Delay in seconds before looping again. Default: 0 */
  delay?: number
  /** Set new initial remaining when starting over the animation */
  newInitialRemainingTime?: number
}

export declare type Props = {
  /** Countdown duration in seconds */
  duration: number
  /** Set the initial remaining time if it is different than the duration */
  initialRemainingTime?: number
  /** Update interval in seconds. Determines how often the timer updates. When set to 0 the value will update on each key frame. Default: 0 */
  updateInterval?: number
  /** Width and height of the SVG element. Default: 180 */
  size?: number
  /** Path stroke width. Default: 12 */
  strokeWidth?: number
  /** Trail stroke width */
  trailStrokeWidth?: number
  /** Path stroke line cap. Default: "round" */
  strokeLinecap?: 'round' | 'square' | 'butt'
  /** Progress path rotation direction. Default: "clockwise" */
  rotation?: 'clockwise' | 'counterclockwise'
  /** Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.). Default: #d9d9d9 */
  trailColor?: ColorFormat
  /** Play or pause animation. Default: false */
  isPlaying?: boolean
  /** Indicates if the colors should smoothly transition to the next color. Default: true */
  isSmoothColorTransition?: boolean
  /** Indicates if the progress path should be growing instead of shrinking. Default: false */
  isGrowing?: boolean
  /** Render function to customize the time/content in the center of the circle */
  children?: (props: TimeProps) => React.ReactNode
  /** On animation complete event handler */
  onComplete?: (totalElapsedTime: number) => OnComplete | void
  /** On remaining time update event handler */
  onUpdate?: (remainingTime: number) => void
} & (SingleColor | MultipleColors)

export declare const useCountdown: (props: Props) => {
  elapsedTime: number
  path: string
  pathLength: number
  remainingTime: number
  rotation: 'clockwise' | 'counterclockwise'
  size: number
  stroke: ColorFormat
  strokeDashoffset: number
  strokeWidth: number
}

export declare const CountdownCircleTimer: {
  (props: Props): JSX.Element
  displayName: 'CountdownCircleTimer'
}
