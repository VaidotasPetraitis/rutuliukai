import { Cooldown } from "../cooldown.js";
import { ABILITIES_DATA, ENUMS_DATA } from "../../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;
const DATA = ABILITIES_DATA.run;

export class Run {
    constructor(cooldown, value, img, rarity, effect) {
        this.value = value || DATA.value;
        this.cooldown = new Cooldown(cooldown || DATA.cooldown);
        this.effect = effect || DATA.effect;
        this.img = img || DATA.img;
        this.rarity = rarity || DATA.rarity;
    };

    condition(keybind) {
        return !this.cooldown.is_ready && keybind;
    };

    operation(player) {
        player.sheet.set_specific_modifier_value(MODIFIER.MovementSpeed, this.value);
        
        setTimeout(() => {
            player.sheet.set_specific_modifier_value(MODIFIER.MovementSpeed, -this.value);
        }, this.effect);
    };

    valid(){
        return true;
    }
};