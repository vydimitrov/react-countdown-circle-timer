import * as React from 'react';
import * as useElapsedTime from 'use-elapsed-time';

interface RenderTime<T> {
    (remainingTime: number, elapsedTime: number, isPlaying: boolean): T
}

type Color = [string, number];
type Colors = {
    0: Color
} & Array<Color>;

export interface CountdownCircleTimerProps {
    /** Countdown duration in seconds */
    durationSeconds: number,
     /** Array of tuples: 1st param - color in HEX format; 2nd param - time to transition to next color represented as a fraction of the total duration */
    colors: Colors,
    /** Set the start time to a different value than 0. Default: 0 */
    startAt?: number,
    /** Width and height of the SVG element. Default: 180 */
    size?: number,
    /** Path stroke width. Default: 12 */
    strokeWidth?: number,
    /** Path stroke line cap. Default: "round" */
    strokeLinecap?: 'round' | 'square',
    /** Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.). Default: #d9d9d9 */
    trailColor?: string,
    /** Play and pause animation. Default: false */
    isPlaying?: boolean,
    /** Apples linear gradient on top of the circle. The gradient doesn't follow the circle path. Works best with two colors. Default: false */
    isLinearGradient?: boolean,
    /** Unique ID for the linearGradient element. It takes random ID if it's not provided */
    gradientUniqueKey?: string,
    /** Render prop function to customize the content in the center of the circle */
    renderTime?: RenderTime<number | string | React.ReactNode>,
    /** 
     * On animation complete event handler. It can be used to restart the animation by returning an array
     * where the first element "shouldRepeat" indicates if the loop should start over
     * and second element "delay" specifies the delay before looping again in milliseconds.
     * 
     */
    onComplete?: useElapsedTime.Config.onComplete,
    /** Aria label for the whole component. Default: "Countdown timer" */
    ariaLabel?: string,
    /** Render prop function to customize the text message that will be read by the screen reader during the countdown */
    renderAriaTime?: RenderTime<string>
}

declare const CountdownCircleTimer: React.FunctionComponent<CountdownCircleTimerProps>;
export {
    CountdownCircleTimer
};