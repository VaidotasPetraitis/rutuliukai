import { UI } from "../../../core/canvas.js";
import { fetch_get } from "../../../core/fetch.js";

export class MenuOptionsBar{
    async html_build_menu_options(callbacks){
        UI.innerHTML += `
            <div id="menu-options-header">
                <h4>HIGHSCORE: <span style="color: white;">${await fetch_get("highscore/get")}</span>💥</h4>
                <h1>RUTULIUKAI</h1>
            </div>
            <div id="menu-options">
                <button id="start-game"><h1>Start Game</h1></button>
                <button id="open-shop"><h1>Shop</h1></button>
                <button id="settings"><h1>Settings</h1><button>
            </div>
        `;
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
            callbacks.build_loadout();
            callbacks.build_shop();
        };

        open_shop.addEventListener('click', handle);
    };

    html_remove_menu_options(){
        UI.removeChild(document.getElementById('menu-options-header'));
        UI.removeChild(document.getElementById('menu-options'));
    };
};