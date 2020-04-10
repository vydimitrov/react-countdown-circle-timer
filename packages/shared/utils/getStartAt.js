export const getStartAt = (initialRemainingTime, durationSeconds) =>
  typeof initialRemainingTime === 'number'
    ? (durationSeconds - initialRemainingTime) * 1000
    : 0
