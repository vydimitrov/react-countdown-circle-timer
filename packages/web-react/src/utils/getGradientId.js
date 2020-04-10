import { uuid } from '.'

export const getGradientId = (isLinearGradient, gradientUniqueKey) =>
  isLinearGradient
    ? `countdown-circle-timer-gradient-${gradientUniqueKey || uuid()}`
    : ''
