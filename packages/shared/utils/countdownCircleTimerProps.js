import PropTypes from 'prop-types'
import { colorsValidator } from '.'

export const countdownCircleTimerProps = {
  duration: PropTypes.number.isRequired,
  colors: colorsValidator,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailStrokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  isPlaying: PropTypes.bool,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  isLinearGradient: PropTypes.bool,
  gradientUniqueKey: PropTypes.string,
  onComplete: PropTypes.func,
  ariaLabel: PropTypes.string,
  renderAriaTime: PropTypes.func,
  initialRemainingTime: PropTypes.number,
  rotation: PropTypes.oneOf(['clockwise', 'counterclockwise']),
}
