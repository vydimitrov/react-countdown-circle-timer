export const getWrapperStyle = (size) => ({
  position: 'relative',
  width: size,
  height: size,
})

export const getTimeStyle = (stroke, size) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  width: size,
  height: size,
  color: stroke,
})

export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: 0,
  clip: 'rect(0 0 0 0)',
  padding: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
}
