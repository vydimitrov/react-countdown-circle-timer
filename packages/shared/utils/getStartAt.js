export const getStartAt = (initialRemainingTime, duration) => {
  if (duration === 0) {
    return 0
  }

  return typeof initialRemainingTime === 'number'
    ? duration - initialRemainingTime
    : 0
}
