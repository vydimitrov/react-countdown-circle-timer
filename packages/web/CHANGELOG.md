# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.1.1...react-countdown-circle-timer@2.1.2) (2020-05-05)


### Bug Fixes

* **web:** Cannot read property 'duration' of undefined - fix [#20](https://github.com/vydimitrov/react-countdown-circle-timer/issues/20) ([bcdb595](https://github.com/vydimitrov/react-countdown-circle-timer/commit/bcdb59595d5fcaa9c7d7f9b357d21dc0af856dde))
* **web:** hide progress path when the duration provided is 0 ([fa48e3d](https://github.com/vydimitrov/react-countdown-circle-timer/commit/fa48e3d5e90e18c25968f0e18d0ca10931e54807))
* **web:** progress path not hidden when countdown is done ([dfe3b2b](https://github.com/vydimitrov/react-countdown-circle-timer/commit/dfe3b2b325ab58c06afed946c9c625ae40737f22))






## [2.1.1](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.1.0...react-countdown-circle-timer@2.1.1) (2020-04-28)

### Docs

**Note:** Update Readme and Changelog - docs related release

# [2.1.0](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.0.5...react-countdown-circle-timer@2.1.0) (2020-04-28)

### Features

- **web:** pass totalElapsedTime as an argument to onComplete callback ([dfd33ce](https://github.com/vydimitrov/react-countdown-circle-timer/commit/dfd33ce05431c43540f384bbd554e14f620e28af))

`onComplete` callback will receive as an argument the `totalElapsedTime` in seconds. This is the total duration since the countdown has started running. It's mainly used when the countdown is repeated and the total duration has to be known. Example: countdown of days, hours, minutes and seconds.

## [2.0.5](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.0.4...react-countdown-circle-timer@2.0.5) (2020-04-27)

### Chore

**Note:** Upgrade use-elapsed-time package to v1.2.1, which passes totalElapsedTime in the onComplete callback

## [2.0.4](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.0.3...react-countdown-circle-timer@2.0.4) (2020-04-23)

### Chore

**Note:** Update Readme to reflect all change since the repo is a monorepo and update use cases in Readme

## [2.0.3](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.0.2...react-countdown-circle-timer@2.0.3) (2020-04-23)

### Hot fix

Local Lerna package was added as "dependencies" instead of "devDependencies" causing installation problems of the package

## [2.0.2](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-countdown-circle-timer@2.0.1...react-countdown-circle-timer@2.0.2) (2020-04-23)

### Hot fix

An attempt to fix broken installation by remove "publishConfig" from package.json

## [2.0.1](2020-04-23)

**Implemented enhancements:**

- Make the repo monorepo handled by Lerna
- Breaking changes:
  - Remove the old `startAt` prop. The recommended prop to use is `initialRemainingTime` instead.
  - Remove `margin` styles from the wrapper and all svg styles
  - `durationSeconds` is renamed to just `duration`. The duration is still in **seconds**
  - `renderTime` prop is now deprecated. React `children` should be used instead. The `children` prop accepts a render function or a component where `remainingTime` and `elapsedTime` are passed as props.
  - `renderAriaTime` prop will receive as an argument an object with the `remainingTime` and `elapsedTime`

## [2.0.0](-)

This release never happened because Lerna bump the first release to 2.0.1. Read the description for version 2.0.1 to find out all changes in this major release.

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
