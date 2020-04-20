export const getWrapperStyle = (size) => ({
  position: 'relative',
  width: size,
  height: size,
})

export const timeStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

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
