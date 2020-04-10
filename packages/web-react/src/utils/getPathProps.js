export const getPathProps = (size, strokeWidth) => {
  const halfSize = size / 2
  const halfStrokeWith = strokeWidth / 2
  const arcRadius = halfSize - halfStrokeWith
  const arcDiameter = 2 * arcRadius

  const pathLength = 2 * Math.PI * arcRadius
  const path = `m ${halfSize},${halfStrokeWith}
          a ${arcRadius},${arcRadius} 0 1,0 0,${arcDiameter}
          a ${arcRadius},${arcRadius} 0 1,0 0,-${arcDiameter}`

  return { path, pathLength }
}
