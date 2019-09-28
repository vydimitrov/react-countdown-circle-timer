import { useEffect, useState, useRef } from 'react';

export const useLoop = (durationMilliseconds, isPlaying) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  if (!isPlaying && requestRef.current !== undefined) {
    cancelAnimationFrame(requestRef.current);
    previousTimeRef.current = undefined;
    requestRef.current = undefined;
  }

  const loop = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      setElapsedTime(prevTime => {
        const currentElapsedTime = prevTime + deltaTime;
        if (currentElapsedTime < durationMilliseconds) {
          return currentElapsedTime;
        }

        cancelAnimationFrame(requestRef.current);
        return durationMilliseconds;
      });
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isPlaying && elapsedTime !== durationMilliseconds) {
      requestRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  return elapsedTime;
};