# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.1.3...react-native-countdown-circle-timer@2.2.0) (2020-05-31)


### Features

* **web, mobile:** add 'rotation' prop to control progress path rotation direction ([6477bfc](https://github.com/vydimitrov/react-countdown-circle-timer/commit/6477bfca722ace184f9d8282ba072c9e4805a645))





## [2.1.3](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.1.2...react-native-countdown-circle-timer@2.1.3) (2020-05-30)

**Note:** Version bump only for package react-native-countdown-circle-timer





## [2.1.2](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.1.1...react-native-countdown-circle-timer@2.1.2) (2020-05-21)


### Bug Fixes

* **mobile:** set explicitly useNativeDriver to false ([0d703b3](https://github.com/vydimitrov/react-countdown-circle-timer/commit/0d703b38369f2dc5e3c2c538fa2203415cf4e4ea))





## [2.1.1](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.1.0...react-native-countdown-circle-timer@2.1.1) (2020-05-05)


### Bug Fixes

* **mobile:** time props can not be changed once component is mounted ([4f9d40a](https://github.com/vydimitrov/react-countdown-circle-timer/commit/4f9d40a739c86ed9b0faed2307a81a3127701d8d))





# [2.1.0](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.0.5...react-native-countdown-circle-timer@2.1.0) (2020-04-28)

### Features

- **mobile:** pass `totalElapsedTime` as an argument to `onComplete` callback ([9909f01](https://github.com/vydimitrov/react-countdown-circle-timer/commit/9909f016ea2885b3f16cc84da1c4a39125e729f6))

`onComplete` callback will receive as an argument the `totalElapsedTime` in seconds. This is the total duration since the countdown has started running. It's mainly used when the countdown is repeated and the total duration has to be known. Example: countdown of days, hours, minutes and seconds.

## [2.0.5](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.0.4...react-native-countdown-circle-timer@2.0.5) (2020-04-24)

### Bug Fixes

- **mobile:** progress path is visible at the end of the countdown ([903da0b](https://github.com/vydimitrov/react-countdown-circle-timer/commit/903da0b66255bb77afdb0552c5a6510fac1645f8))

## [2.0.4](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.0.3...react-native-countdown-circle-timer@2.0.4) (2020-04-23)

### Chore

**Note:** Update Readme to reflect all change since the repo is a monorepo and update use cases in Readme

## [2.0.3](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.0.2...react-native-countdown-circle-timer@2.0.3) (2020-04-23)

### Hot fix

Local Lerna package was added as "dependencies" instead of "devDependencies" causing installation problems of the package

## [2.0.2](https://github.com/vydimitrov/react-countdown-circle-timer/compare/react-native-countdown-circle-timer@2.0.1...react-native-countdown-circle-timer@2.0.2) (2020-04-23)

### Hot fix

An attempt to fix broken installation by remove "publishConfig" from package.json

## [2.0.1](2020-04-23)

First version of the package

## [2.0.0](-)

This release never happened because Lerna bump the first release to 2.0.1. The Mobile package stars versions from v2 to meet its Web counterpart's version.
