import { AUDIO_PRELOADED, AUDIO_SETTINGS, AUDIO_TYPE, AudioManager } from "../../../core/audio.js";
import { UI } from "../../../core/canvas.js";

export class SettingsBar{
    constructor() {
    };

    html_build() {
        const section = `
            <div id="settings-container">
                <div id="settings-container-header">
                    <h2 id="settings-container-header-title">SETTINGS</h2>
                    <button id="settings-container-close">X</button>
                </div>
                <div id="settings-container-volume">         
                    <h2 id="settings-container-volume-title">AUDIO</h2>
                    <div class="volume-slider" id="volume-master">
                        <label for="input-background">Master: </label>
                        <input type="range" min="1" max="100" value="${AUDIO_SETTINGS.volume * 100}" class="slider" id="input-master">
                    </div>   
                </div>
            </div>
        `;

        UI.insertAdjacentHTML( 'beforeend', section);
        document.getElementById('settings-container-close').addEventListener('click', () => this.html_close());
        this.html_master_volume_master();
        AudioManager.playAudio(AUDIO_PRELOADED[AUDIO_TYPE.Town].shop_open);
    };

    html_close() {
        document.getElementById('settings-container')?.remove();
    };

    html_master_volume_master(){
        const master_input = document.querySelector('#input-master');

        const handle = () => {
            const volume = parseInt(master_input.value) / 100;
            AudioManager.setVolume(volume);
        };

        master_input.addEventListener('click', handle);
    }
};
