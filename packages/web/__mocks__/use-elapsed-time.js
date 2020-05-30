let isPlaying = false
let elapsedTime = 0
let options = {}
let reset = () => {}

module.exports = {
  useElapsedTime(isPlayingBool, configObj) {
    options = configObj
    isPlaying = isPlayingBool

    return { elapsedTime, reset }
  },

  __setElapsedTime(time) {
    elapsedTime = time
  },

  __setResetMethod(resetFn) {
    reset = resetFn
  },

  __resetElapsedTime() {
    elapsedTime = 0
  },

  __resetResetMethod() {
    reset = () => {}
  },

  __fireOnComplete(...rest) {
    options.onComplete(...rest)
  },

  __getConfig() {
    return options
  },

  __resetConfig() {
    options = {}
  },

  __getIsPlaying() {
    return isPlaying
  },

  __resetIsPlaying() {
    isPlaying = false
  },
}
