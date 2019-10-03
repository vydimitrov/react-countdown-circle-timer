export const getPath = (size, strokeWidth) => {
  const halfSize = size / 2;
  const halfStrokeWith = strokeWidth / 2;
  const arcPathCenter = halfSize - halfStrokeWith;
  const arcDiameter = arcPathCenter * 2;

  return `m ${halfSize},${halfStrokeWith}
          a ${arcPathCenter},${arcPathCenter} 0 1,0 0,${arcDiameter}
          a ${arcPathCenter},${arcPathCenter} 0 1,0 0,-${arcDiameter}`;
};