const millisecondsToText = (ms) => {
    const min = Math.floor((ms / 1000 / 60) << 0) || 0
    const sec = Math.floor((ms / 1000) % 60) || 0
    const value = min + ':' + sec
    return value
}

export {
    millisecondsToText
}
