export function createAudioLoader(context) {
    return function loadAudio(url) {
        return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer));
    }
}