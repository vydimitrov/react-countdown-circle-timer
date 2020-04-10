export const getStartAt = (
  initialRemainingTime,
  startAtSeconds,
  durationSeconds
) => {
  if (typeof initialRemainingTime === 'number') {
    return (durationSeconds - initialRemainingTime) * 1000
  }

  return startAtSeconds ? startAtSeconds * 1000 : 0
}
