# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.3.7 (2020-07-24)

**Note:** Configure Github action to release using Lerna. No changes on component code.

## 2.3.6 (2020-07-22)

**Note:** Configure Github action to release using Lerna. No changes on component code.

## 2.3.5 (2020-07-22)

**Note:** Configure Github action to release using Lerna. No changes on component code.

## 2.3.4 (2020-07-22)

**Note:** Configure Github action to release using Lerna. No changes on component code.

## [2.3.3](https://github.com/vydimitrov/react-countdown-circle-timer/compare/v2.3.2...v2.3.3) (2020-07-21)

**Note:** An attempt to configure Lerna to create Github releases. No changes on component code.

## [2.3.2](https://github.com/vydimitrov/react-countdown-circle-timer/compare/v2.3.1...v2.3.2) (2020-07-21)

**Note:** An attempt to configure Lerna to create Github releases. No changes on component code.

## [2.3.1](https://github.com/vydimitrov/react-countdown-circle-timer/compare/v2.3.0...v2.3.1) (2020-07-21)

**Note:** An attempt to configure Lerna to create Github releases. No changes on component code.

# 2.3.0 (2020-07-21)

### Features

- **web, mobile:** allow passing string as a single color to colors prop ([f5ba08c](https://github.com/vydimitrov/react-countdown-circle-timer/commit/f5ba08c604f89fcf42bf4dbb62f883bd7b2d1647))

## 2.0.0

**Implemented enhancements:**

- Make the repo monorepo handled by Lerna
- Breaking changes:
  - Remove the old `startAt` prop. The recommended prop to use is `initialRemainingTime` instead.
  - Remove `margin` styles from the wrapper and all svg styles
  - `durationSeconds` is renamed to just `duration`. The duration is still in **seconds**
  - `renderTime` prop is now deprecated. React `children` should be used instead. The `children` prop accepts a render function or a component where `remainingTime` and `elapsedTime` are passed as props.
  - `renderAriaTime` prop will receive as an argument an object with the `remainingTime` and `elapsedTime`

## 1.2.1 (April 8th, 2020)

**Implemented enhancements:**

- Refactor internal logic to prep the code for monorepo
- Remove `path.getTotalLength()` dependency and add logic to calculate the path length
- Improve test coverage
- Add Prettier

**Bug fixes:**

- Fix an issue in Firefox where the progress bar does not get to 0

## 1.1.1 (February 23th, 2020)

**Implemented enhancements:**

- Add GitHub workflow to report test coverage and build status
- Add a new badge for weekly downloads

## 1.1.0 (February 1st, 2020)

**Implemented enhancements:**

- Replace `startAt` with `initialRemainingTime`. Using `startAt` in the context of countdown is confusing
- `startAt` can be used until the next major release for backward compatibility
- `initialRemainingTime` sets the initial remaining time when the countdown starts

## 1.0.6 (January 12th, 2020)

**Implemented enhancements:**

- Add TypeScript type definitions

## 1.0.5 (December 22nd, 2019)

**Implemented enhancements:**

- Add test coverage

## 1.0.4 (December 3rd, 2019)

**Implemented enhancements:**

- Add `a11y` support by exposing two additional props `ariaLabel` and `renderAriaTime`

## 1.0.3 (November 16th, 2019)

**Implemented enhancements:**

- Replace custom hook that handles animation loop with [useElapsedTime ](https://github.com/vydimitrov/use-elapsed-time)
- Add Changelog file
