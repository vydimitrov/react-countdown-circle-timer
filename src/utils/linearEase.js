export const linearEase = (time, start, goal, duration) =>{
  const currentTime = time / duration;
  return start + (goal * currentTime);
};