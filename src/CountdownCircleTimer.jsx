import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

const getWrapperStyle = size => ({
  position: 'relative',
  width: size,
  height: size,
  margin: '0 auto'
});

const getTimeStyle = (stroke, size) => ({
  display: 'flex',
  '-webkit-box-pack': 'center',
  '-ms-flex-pack': 'center',
  'justify-content': 'center',
  '-webkit-box-align': 'center',
  '-ms-flex-align': 'center',
  'align-items': 'center',
  position: 'relative',
  width: size,
  height: size,
  color: stroke
});

const svgStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

const linearEase = (time, start, goal, duration) =>{
  const currentTime = time / duration;
  return start + (goal * currentTime);
};

const getPath = (size, strokeWidth) => {
  const halfSize = size / 2;
  const halfStrokeWith = strokeWidth / 2;
  const arcPathCenter = halfSize - halfStrokeWith;
  const arcDiameter = arcPathCenter * 2;

  return `m ${halfSize},${halfStrokeWith}
          a ${arcPathCenter},${arcPathCenter} 0 1,0 0,${arcDiameter}
          a ${arcPathCenter},${arcPathCenter} 0 1,0 0,-${arcDiameter}`;
};

const useLoop = (durationMilliseconds, isPlaying) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

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

const getColorsRGB = colors => colors.map(color => {
  const rgb = color[0].replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

  return [{ r: rgb[0], g: rgb[1], b: rgb[2], opacity: 1 }, color[1]];
});

const getNormalizedColors = (colors, durationMilliseconds) => {
  const colorsRGB = getColorsRGB(colors);

  if (colorsRGB.left === 1) {
    return colorsRGB[0];
  }

  const colorsLength = colorsRGB.length;
  let colorsTotalDuration = 0;

  return  colorsRGB.map((color, index) => {
    const isLastColor = colorsLength === index + 1;
    if (colorsTotalDuration >= durationMilliseconds || isLastColor) {
      colorsTotalDuration = durationMilliseconds;
      return { ...color[0], colorEndTime: colorsTotalDuration };
    }

    const colorStartTime = colorsTotalDuration;
    const colorEndTimeTemp =  color[1] !== undefined
      ? colorStartTime + (color[1] * durationMilliseconds)
      : durationMilliseconds - colorsTotalDuration;
    const colorEndTime = colorEndTimeTemp >= durationMilliseconds ? durationMilliseconds : colorEndTimeTemp;

    const nextColor = colorsRGB[index + 1][0];
    const goals = {
      goalR: nextColor.r - color[0].r,
      goalG: nextColor.g - color[0].g,
      goalB: nextColor.b - color[0].b,
    };

    colorsTotalDuration = colorEndTime;
    return { ...color[0], ...goals, colorStartTime, colorEndTime, duration: colorEndTime - colorStartTime };
  });
};

const getRGBStyle = ({ r, g, b, opacity }) => `rgba(${r}, ${g}, ${b}, ${opacity})`;

const getStroke = (normalizedColors, elapsedTime) => {
  if (normalizedColors.length === 1) {
    return getRGBStyle(normalizedColors[0]);
  }

  const color = normalizedColors.find(({ colorEndTime}) => elapsedTime <= colorEndTime);
  if (color.duration === undefined) {
    return getRGBStyle(color);
  }

  const currentColorStartTime = elapsedTime - color.colorStartTime;
  const r = linearEase(currentColorStartTime, color.r, color.goalR, color.duration) | 0;
  const g = linearEase(currentColorStartTime, color.g, color.goalG, color.duration) | 0;
  const b = linearEase(currentColorStartTime, color.b, color.goalB, color.duration) | 0;

  return getRGBStyle({ r, g, b, opacity: color.opacity });
};

const CountdownCircleTimer = props => {
  const {
    size,
    strokeWidth,
    trailColor,
    durationSeconds,
    isPlaying,
    colors,
    strokeLinecap,
    timeFormatter
  } = props;

  const pathRef = useRef(null);
  const [pathTotalLength, setPathTotalLength] = useState(0);
  const path = useMemo(() => getPath(size, strokeWidth), [size, strokeWidth]);
  const durationMilliseconds = useMemo(() => durationSeconds * 1000, [durationSeconds]);
  const normalizedColors = useMemo(() => getNormalizedColors(colors, durationMilliseconds), [colors, durationMilliseconds]);

  useEffect(() => {
    const totalLength = pathRef.current.getTotalLength().toFixed(2);
    setPathTotalLength(totalLength);
  }, []);

  const elapsedTime = useLoop(durationMilliseconds, isPlaying);
  const strokeDasharray = linearEase(elapsedTime, 0, pathTotalLength, durationMilliseconds).toFixed(2);
  const stroke = getStroke(normalizedColors, elapsedTime);
  const remainingTime = Math.ceil((durationMilliseconds - elapsedTime) / 1000);

  return (
    <div style={getWrapperStyle(size)}>
      <svg width={size} height={size} style={svgStyle} xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke={trailColor}
          d={path}
        />
        <path
          fill="none"
          stroke={stroke}
          d={path}
          ref={pathRef}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={pathTotalLength}
          strokeDashoffset={strokeDasharray}
        />
      </svg>
      <div style={getTimeStyle(stroke, size)}>
        {typeof timeFormatter === 'function' && timeFormatter(remainingTime, elapsedTime)}
      </div>
    </div>
  );
};

CountdownCircleTimer.propTypes = {
  durationSeconds: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  isPlaying: PropTypes.bool,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  timeFormatter: PropTypes.func
};

CountdownCircleTimer.defaultProps = {
  size: 180,
  strokeWidth: 12,
  trailColor: '#d9d9d9',
  isPlaying: false,
  strokeLinecap: 'round'
};

export {
  CountdownCircleTimer
};