// Due to bug https://github.com/jsdom/jsdom/issues/1330
// we make this separate function so it can be mocked

export const getPathTotalLength = path => path.getTotalLength().toFixed(2);