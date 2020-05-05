export const linearEase = (time, start, goal, duration) => {
  if (duration === 0) {
    return goal
  }

  const currentTime = time / duration
  return start + goal * currentTime
}
