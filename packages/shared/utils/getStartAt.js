export const getStartAt = (initialRemainingTime, duration) =>
  typeof initialRemainingTime === 'number'
    ? (duration - initialRemainingTime) * 1000
    : 0
