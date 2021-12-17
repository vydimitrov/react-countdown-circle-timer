export const getStartAt = (initialRemainingTime: number, duration: number) => {
  if (duration === 0) {
    return 0
  }

  return typeof initialRemainingTime === 'number'
    ? duration - initialRemainingTime
    : 0
}
