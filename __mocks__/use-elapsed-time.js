let elapsedTime = 0;
let config = undefined;
let isPlaying = false;

module.exports = {
    useElapsedTime(isPlayingBool, configObj = {}) {
        config = configObj;
        isPlaying = isPlayingBool;
        
        return elapsedTime;
    },

    __setElapsedTime(time) {
        elapsedTime = time;
    },

    __resetElapsedTime() {
        elapsedTime = 0;
    },

    __fireOnComplete() {
        config.onComplete();
    },

    __getConfig() {
        return config;
    },

    __resetConfig() {
        config = undefined;
    },

    __getIsPlaying() {
        return isPlaying;
    },

    __resetIsPlaying() {
        isPlaying = undefined;
    }
};