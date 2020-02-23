# Change Log

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