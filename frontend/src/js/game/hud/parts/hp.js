import { UI } from "../../../core/canvas.js";
import { HTML_PLAYER_DATA } from "../../../core/fetch.js";

export class HealthBar {
    constructor() {
        this.scale = HTML_PLAYER_DATA.scale;
        this.width = HTML_PLAYER_DATA.width;
    }

    html_build_health() {
        UI.innerHTML += `
            <div id="health-bar-background">
                <p id="health-text"></p>
            </div>
        `;
        UI.innerHTML += `
            <div id="health-bar-value">
            
            </div>
        `;
    };

    html_update_health(player_hp){
        const background = document.getElementById('health-bar-background');
        const value = document.getElementById('health-bar-value');
        const p =document.getElementById('health-text')

        const player_hp_percent = (player_hp.value / player_hp.value_max).toFixed(2);
        const player_hp_percent_format = Math.floor(player_hp_percent * 100);

        background.style.width = this.width * this.scale + 'px';
        value.style.width = (this.width * player_hp_percent) * this.scale + 'px'; 
        p.innerHTML = `${player_hp_percent_format} %`; 
    };


    html_remove_health() {
        UI.removeChild(document.getElementById('health-bar-background'));
        UI.removeChild(document.getElementById('health-bar-value'));
    };
};