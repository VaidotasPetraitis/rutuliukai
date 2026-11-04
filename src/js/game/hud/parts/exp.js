import { UI } from "../../../core/canvas.js";
import { HTML_PLAYER_DATA } from "../../../core/fetch.js";

export class ExperienceBar {
    constructor() {
        this.scale = HTML_PLAYER_DATA.scale;
        this.width = HTML_PLAYER_DATA.width;
    }

    html_build_exp() {
        UI.innerHTML += `
            <div id="exp-bar-background">
                <p id="exp-text"></p>
                <p id="exp-level"></p>
            </div>
        `;
        UI.innerHTML += `
            <div id="exp-bar-value">
            </div>
        `;
    };

    html_update_exp(player_exp){
        const background = document.getElementById('exp-bar-background');
        const value = document.getElementById('exp-bar-value');
        const p = document.getElementById('exp-text')
        const plv = document.getElementById('exp-level');

        const player_exp_percent = Math.min(1, (player_exp.exp_current / player_exp.exp_required).toFixed(2));

        background.style.width = this.width * this.scale + 'px';
        const width_remaining =  (this.width * player_exp_percent) * this.scale;
        value.style.width = width_remaining + 'px'; 
        
        p.innerHTML = `${Math.floor((player_exp.exp_current / player_exp.exp_required) * 100)} %`; 
        plv.innerHTML = `${player_exp.current} Lv.`;
    };


    html_remove_exp() {
        UI.removeChild(document.getElementById('exp-bar-background'));
        UI.removeChild(document.getElementById('exp-bar-value'));
    };
};