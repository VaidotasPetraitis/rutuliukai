import { Cooldown } from "../cooldown.js";
import { ABILITIES_DATA } from "../../../core/fetch.js";

const DATA = ABILITIES_DATA.heal;

export class Heal {
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
        const player_hp = player.sheet.get_specific_health_fields();
        player_hp.value = Math.min(100, player_hp.value + this.value);
    };

    valid(){
        return true;
    }
};