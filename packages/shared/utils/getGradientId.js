import { uuid } from '.'

export const getGradientId = (gradientUniqueKey) =>
  `countdown-circle-timer-gradient-${gradientUniqueKey || uuid()}`
