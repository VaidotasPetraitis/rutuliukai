export const AUDIO_TYPE = {
    Town: 'Town',
    Arena: 'Arena'
};

export const AUDIO_SETTINGS = {
    volume: 0.15,
    rate: 1
}

const audioUnlock = new AbortController();

export class AudioManager {
    static ctx = new AudioContext();
    static gainNode = AudioManager.ctx.createGain();

    static activeSources = new Set();

    static async resume() {
        try {
            await AudioManager.ctx.resume();
            audioUnlock.abort();
        } catch (error) {
            console.warn("Could not resume game audio", error);
        }
    }

    static playAudio(audioBuffer, loop = false) {
        const source = AudioManager.ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = loop;
        source.playbackRate.value = AUDIO_SETTINGS.rate;

        AudioManager.gainNode.gain.value = AUDIO_SETTINGS.volume;

        source.connect(AudioManager.gainNode);
        AudioManager.gainNode.connect(AudioManager.ctx.destination);

        source.start();

        AudioManager.activeSources.add(source);

        source.onended = () => {
            AudioManager.activeSources.delete(source);
        };
        return source;
    }

    static stopAllAudio(exceptSource = null) {
        for (const source of AudioManager.activeSources) {
            if (source === exceptSource) {
                continue;
            }
            source.stop();
            AudioManager.activeSources.delete(source);
        }
    }

    static setVolume(volume){
        AudioManager.gainNode.gain.value = volume;
        AUDIO_SETTINGS.volume = volume;
    }

    static setPlaybackRate(rate){
        AudioManager.activeSources.forEach(source => {
           source.playbackRate.value = rate;
        });

        AUDIO_SETTINGS.rate = rate;
    }
}

if (AudioManager.ctx.state === "suspended") {
    const options = { capture: true, signal: audioUnlock.signal };
    document.addEventListener("click", AudioManager.resume, options);
    document.addEventListener("keydown", AudioManager.resume, options);
}

export const AUDIO_PRELOADED = {
    [AUDIO_TYPE.Town]: await AudioFactory(AUDIO_TYPE.Town),
    [AUDIO_TYPE.Arena]: await AudioFactory(AUDIO_TYPE.Arena)
}

async function AudioFactory(audioType) {
    switch (audioType) {
        case AUDIO_TYPE.Town:
            return {
                background: await loadAudioBuffer(AudioManager.ctx, "./asset/audio/menu_background.wav"),
                shop_open: await loadAudioBuffer(AudioManager.ctx, "./asset/audio/menu_shop_open.wav")
            };
        case AUDIO_TYPE.Arena:
            return {
                monster_hit: await loadAudioBuffer(AudioManager.ctx, "./asset/audio/arena_monster_hit.wav"),
                background: await loadAudioBuffer(AudioManager.ctx, "./asset/audio/arena_background.wav")
            };
        default:
            throw new Error("Invalid audio type");
    }
}

async function loadAudioBuffer(ctx, url) {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
}
