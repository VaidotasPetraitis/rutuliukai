export const AUDIO_TYPE = {
    Town: 'Town',
    Arena: 'Arena'
};

export const AUDIO_SETTINGS = {
    volume: 0.15,
    rate: 1
}

export class AudioManager {
    static ctx;
    static gainNode;

    static activeSources = new Set();
    static lastHitTime = -Infinity;

    static startPlayback() {
        AudioManager.ctx = new AudioContext();
        AudioManager.gainNode = AudioManager.ctx.createGain();
        AudioManager.gainNode.connect(AudioManager.ctx.destination);
        AudioManager.ctx.resume().catch(error => console.warn("Could not resume game audio", error));
    }

    static playAudio(audioBuffer, loop = false) {
        if (audioBuffer === AUDIO_PRELOADED[AUDIO_TYPE.Arena].monster_hit) {
            const now = performance.now();
            if (now - AudioManager.lastHitTime < 50) return;
            AudioManager.lastHitTime = now;
        }

        const source = AudioManager.ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = loop;
        source.playbackRate.value = AUDIO_SETTINGS.rate;

        AudioManager.gainNode.gain.value = AUDIO_SETTINGS.volume;

        source.connect(AudioManager.gainNode);

        source.start();

        AudioManager.activeSources.add(source);

        source.onended = () => {
            AudioManager.activeSources.delete(source);
        };
        return source;
    }

    static stopAllAudio(exceptSource = null) {
        AudioManager.lastHitTime = -Infinity;
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

const decoder = new OfflineAudioContext(1, 1, 44100);
const [menuBackground, shopOpen, monsterHit, arenaBackground] = await Promise.all([
    loadAudioBuffer("menu_background.mp3"),
    loadAudioBuffer("menu_shop_open.wav"),
    loadAudioBuffer("arena_monster_hit.wav"),
    loadAudioBuffer("arena_background.mp3"),
]);

export const AUDIO_PRELOADED = {
    [AUDIO_TYPE.Town]: { background: menuBackground, shop_open: shopOpen },
    [AUDIO_TYPE.Arena]: { monster_hit: monsterHit, background: arenaBackground },
};

async function loadAudioBuffer(file) {
    const response = await fetch(new URL(`../../../asset/audio/${file}`, import.meta.url));
    if (!response.ok) {
        throw new Error(`Could not load ${file}: HTTP ${response.status}`);
    }
    return decoder.decodeAudioData(await response.arrayBuffer());
}
