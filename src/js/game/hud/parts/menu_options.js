import { UI } from "../../../core/canvas.js";
import { KEYBIND_ABILITIES_DATA, KEYBIND_MOVEMENT_DATA } from "../../../core/fetch.js";
import { Highscore } from "../../../core/highscore.js";

const movement = KEYBIND_MOVEMENT_DATA;
const abilities = KEYBIND_ABILITIES_DATA;

export class MenuOptionsBar{
    async html_build_menu_options(callbacks){
        UI.innerHTML += `
            <div id="menu-options-header">
                <h4>HIGHSCORE: <span style="color: white;">${Highscore.get()}</span>💥</h4>
                <h1>RUTULIUKAI</h1>
            </div>
            <div id="menu-options">
                <button id="start-game"><h1>Start Game</h1></button>
                <button id="open-shop"><h1>Shop</h1></button>
                <button id="settings"><h1>Settings</h1></button>
            </div>
        `;
        if (!document.getElementById('menu-controls')) {
            UI.insertAdjacentHTML('beforeend', `
                <aside id="menu-controls" aria-labelledby="menu-controls-title">
                    <h2 id="menu-controls-title">Controls</h2>
                    <p><span class="control-key-group"><kbd>${movement.up}</kbd> <kbd>${movement.left}</kbd> <kbd>${movement.down}</kbd> <kbd>${movement.right}</kbd></span> Movement</p>
                    <p><span class="control-key-group"><kbd>${abilities.skill1}</kbd> <kbd>${abilities.skill2}</kbd> <kbd>${abilities.skill3}</kbd></span> Use ability slots 1–3</p>
                </aside>
            `);
        }
        this.handle_click_start_game(callbacks);
        this.handle_click_open_shop(callbacks);
        this.handle_click_settings(callbacks);
    };

    handle_click_start_game(callbacks) {
        const start_game = document.getElementById('start-game');
        const handle = () => {
            callbacks.start_game();
        };

        start_game.addEventListener('click', handle);
    };
    
    handle_click_settings(callbacks) {
        const settings = document.getElementById('settings');
        const handle = () => {
            callbacks.build_settings();
        };

        settings.addEventListener('click', handle);
    };

    handle_click_open_shop(callbacks) {
        const open_shop = document.getElementById('open-shop');
        const handle = () => {
            callbacks.build_shop();
        };

        open_shop.addEventListener('click', handle);
    };

    html_remove_menu_options(){
        UI.removeChild(document.getElementById('menu-options-header'));
        UI.removeChild(document.getElementById('menu-options'));
    };
};
