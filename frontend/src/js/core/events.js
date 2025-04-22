import { KEYBIND_ABILITIES_DATA, KEYBIND_MOVEMENT_DATA } from "./fetch.js";

export class Events {
    constructor() {
        this.handlers = {
            bound_handle_key_up: this.handle_key_up.bind(this),
            bound_handle_key_down: this.handle_key_down.bind(this),
        };
    }

    handle_player_movement_listeners(player) {
        document.addEventListener("keydown", (evt) => this.handlers.bound_handle_key_down(evt, player));
        document.addEventListener("keyup", (evt) => this.handlers.bound_handle_key_up(evt, player));
    }

    handle_key_down(evt, player) {
        if (evt.key == KEYBIND_MOVEMENT_DATA.up) player.keybind.movement.up = true;
        if (evt.key == KEYBIND_MOVEMENT_DATA.down) player.keybind.movement.down = true;
        if (evt.key == KEYBIND_MOVEMENT_DATA.left) player.keybind.movement.left = true;
        if (evt.key == KEYBIND_MOVEMENT_DATA.right) player.keybind.movement.right = true;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill1) player.keybind.abilities[0].key = true;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill2) player.keybind.abilities[1].key = true;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill3) player.keybind.abilities[2].key = true;
    }

    handle_key_up(evt, player) {
        if (evt.key == KEYBIND_MOVEMENT_DATA.up) player.keybind.movement.up = false;
        if (evt.key == KEYBIND_MOVEMENT_DATA.down) player.keybind.movement.down = false;       
        if (evt.key == KEYBIND_MOVEMENT_DATA.left) player.keybind.movement.left = false;
        if (evt.key == KEYBIND_MOVEMENT_DATA.right) player.keybind.movement.right = false;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill1) player.keybind.abilities[0].key = false;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill2) player.keybind.abilities[1].key = false;
        if (evt.key == KEYBIND_ABILITIES_DATA.skill3) player.keybind.abilities[2].key = false;
    }
}