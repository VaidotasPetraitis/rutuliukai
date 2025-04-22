import { Cooldown } from "../cooldown.js";
import { ABILITIES_DATA } from "../../../core/fetch.js";

const DATA = ABILITIES_DATA.teleport;

export class Teleport {
    constructor(cooldown, value, img, rarity) {
        this.value = value || DATA.value;
        this.cooldown = new Cooldown(cooldown || DATA.cooldown);
        this.img = img || DATA.img;
        this.rarity = rarity || DATA.rarity;
    };

    condition(keybind) {
        return !this.cooldown.is_ready && keybind;
    };

    operation(player) {
        const keybinds = player.keybind.movement;
        const location = player.rect.location;
        if (keybinds.up)    location.y -= this.value;
        else if (keybinds.down)  location.y += this.value;
        else if (keybinds.left)  location.x -= this.value;
        else if (keybinds.right) location.x += this.value;
        else location.y += this.value;

    };

    monster_condition() {
        return !this.cooldown.is_ready;
    };

    monster_operation(monster_loc) {
        monster_loc.x += (monster_loc.vector.nx * this.value);
        monster_loc.y += (monster_loc.vector.ny * this.value);
    };

    valid(){
        return true;
    }
};