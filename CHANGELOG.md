# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/vydimitrov/react-countdown-circle-timer/compare/v2.3.0...v2.3.1) (2020-07-21)

**Note:** Version bump only for package countdown-circle-timer-monorepo





# 2.3.0 (2020-07-21)


### Bug Fixes

* **mobile:** clear repeat timeout when component is unmounted, fixes [#29](https://github.com/vydimitrov/react-countdown-circle-timer/issues/29) ([76259be](https://github.com/vydimitrov/react-countdown-circle-timer/commit/76259be67bee78b03253dff2aecc175a6864aca5))
* **mobile:** progress path is visible at the end of the countdown ([903da0b](https://github.com/vydimitrov/react-countdown-circle-timer/commit/903da0b66255bb77afdb0552c5a6510fac1645f8))
* **mobile:** set explicitly useNativeDriver to false ([0d703b3](https://github.com/vydimitrov/react-countdown-circle-timer/commit/0d703b38369f2dc5e3c2c538fa2203415cf4e4ea))
* **mobile:** time props can not be changed once component is mounted ([4f9d40a](https://github.com/vydimitrov/react-countdown-circle-timer/commit/4f9d40a739c86ed9b0faed2307a81a3127701d8d))
* **shared:** make the package private so it is not published to NPM ([ee9aec9](https://github.com/vydimitrov/react-countdown-circle-timer/commit/ee9aec9bd7334234c5dae842d2fc12efd79d7c1e))
* **shared:** remove unexported const ([40681ae](https://github.com/vydimitrov/react-countdown-circle-timer/commit/40681ae27aa41ce7b7b7f7a812f0988becb9e126))
* **web:** Cannot read property 'duration' of undefined - fix [#20](https://github.com/vydimitrov/react-countdown-circle-timer/issues/20) ([bcdb595](https://github.com/vydimitrov/react-countdown-circle-timer/commit/bcdb59595d5fcaa9c7d7f9b357d21dc0af856dde))
* **web:** fix edge-case issues with colors transition and improve test coverage ([979d363](https://github.com/vydimitrov/react-countdown-circle-timer/commit/979d363c2bd7105fa23abde9c3592bd094b172ad))
* **web:** hide progress path when the duration provided is 0 ([fa48e3d](https://github.com/vydimitrov/react-countdown-circle-timer/commit/fa48e3d5e90e18c25968f0e18d0ca10931e54807))
* **web:** progress path not hidden when countdown is done ([dfe3b2b](https://github.com/vydimitrov/react-countdown-circle-timer/commit/dfe3b2b325ab58c06afed946c9c625ae40737f22))
* **web:** upgrade use-elapsed-time to 2.1.5, which fixes [#28](https://github.com/vydimitrov/react-countdown-circle-timer/issues/28) ([722e41e](https://github.com/vydimitrov/react-countdown-circle-timer/commit/722e41e95deb7637bcbe1fb3f3cfc8c48643cec4))
* **web:** upgrade useElapsedTime to 2.1.3, which fixes [#24](https://github.com/vydimitrov/react-countdown-circle-timer/issues/24) and fixes [#6](https://github.com/vydimitrov/react-countdown-circle-timer/issues/6) ([0668a6d](https://github.com/vydimitrov/react-countdown-circle-timer/commit/0668a6d3e7558c94103cf40dec6ffd9ad7ddf4b7))
* add local package as dev dependancy ([cb7f3bd](https://github.com/vydimitrov/react-countdown-circle-timer/commit/cb7f3bd3fa64c1203c96743cfa9d000edf4e78e1))
* clear Codecov action to upload report ([c91c0fc](https://github.com/vydimitrov/react-countdown-circle-timer/commit/c91c0fcd16599404d264f7c6fbebfb8a7e9b613f))
* codecov github action ([4945331](https://github.com/vydimitrov/react-countdown-circle-timer/commit/4945331b46d0ea7b3e00a9f31e749185a0e17897))
* command in github action to collect coverage ([d200aa4](https://github.com/vydimitrov/react-countdown-circle-timer/commit/d200aa4c7627c43added9b71d7cb8cac36ad32b5))
* github action that reports code coverage ([4fd9851](https://github.com/vydimitrov/react-countdown-circle-timer/commit/4fd9851da8cfc270e0ae0a486c3345812ece82dd))
* remove publishConfig from web and mobile package.json ([f21eb65](https://github.com/vydimitrov/react-countdown-circle-timer/commit/f21eb65bfa94bf6f78b5267c0bd42a84c9ae8c80))


### Features

* **mobile:** pass totalElapsedTime as an argument to onComplete callback ([9909f01](https://github.com/vydimitrov/react-countdown-circle-timer/commit/9909f016ea2885b3f16cc84da1c4a39125e729f6))
* **mobile:** update Mobile component's API to match the Web's one ([0949fd9](https://github.com/vydimitrov/react-countdown-circle-timer/commit/0949fd970a2436068130f0e55c30581900db652d))
* **web:** pass totalElapsedTime as an argument to onComplete callback ([dfd33ce](https://github.com/vydimitrov/react-countdown-circle-timer/commit/dfd33ce05431c43540f384bbd554e14f620e28af))
* **web, mobile:** add 'rotation' prop to control progress path rotation direction ([6477bfc](https://github.com/vydimitrov/react-countdown-circle-timer/commit/6477bfca722ace184f9d8282ba072c9e4805a645))
* **web, mobile:** allow passing string as a single color to colors prop ([f5ba08c](https://github.com/vydimitrov/react-countdown-circle-timer/commit/f5ba08c604f89fcf42bf4dbb62f883bd7b2d1647))
* add conventionalCommits for publishing in Lerna config ([c128e4b](https://github.com/vydimitrov/react-countdown-circle-timer/commit/c128e4bd95edde4fe1c5f793cb7028283091e01f))
* add mobile react native package and some basic setup for it ([61a66a0](https://github.com/vydimitrov/react-countdown-circle-timer/commit/61a66a0373098ab11dd54b4ad3bd4d97538e9ed5))
* add prettier ([1fb2dbd](https://github.com/vydimitrov/react-countdown-circle-timer/commit/1fb2dbd245d7692d923e1410f3c71b8fcef5b41f))
* add shared package ([f1ce6ad](https://github.com/vydimitrov/react-countdown-circle-timer/commit/f1ce6ad83f65f17ca3bc13f886f9aa49935ff5c9))


### Reverts

* Revert "chore: add codecov.yml" ([2659997](https://github.com/vydimitrov/react-countdown-circle-timer/commit/2659997bec947831890e62f78209864263f1c635))
