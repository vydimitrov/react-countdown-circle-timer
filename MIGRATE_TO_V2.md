## Migrating from v1.x.x to v2.x.x?

The component API is updated in v2 to make it more robust and developer-friendly. Please consider the small changes below before switching to v2.x.x:

- `durationSeconds` is renamed to just `duration`. The duration is still in **seconds**
- `renderTime` prop is now deprecated. React `children` should be used instead. The `children` prop accepts a render function or a component where `remainingTime` and `elapsedTime` are passed as props.
- `startAt` prop is deprecated. The recommended prop to use is `initialRemainingTime` instead.
- `margin` styles from the wrapper and all svg styles are now removed.
