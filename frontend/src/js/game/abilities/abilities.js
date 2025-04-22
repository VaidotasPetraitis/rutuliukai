import { Collection } from "../../core/collection.js";
import { Teleport } from "./skill/teleport.js";
import { Heal } from "./skill/heal.js";
import { Run } from "./skill/run.js";
import { Placeholder } from "./skill/placeholder.js";
import { ENUMS_DATA } from "../../core/fetch.js";

const ABILITY_TYPE = ENUMS_DATA.AbilityType;

export class Abilities {
    constructor() {
        this.abilities = new Collection({
            data: [ new Placeholder(), new Placeholder(), new Placeholder() ]
        });
    };

    use(player) {
        const keybinds = player.keybind.abilities;
        for (let i = 0; i < this.abilities.size(); i++) {
            const a = this.abilities.get(i);
            if(a.valid()) {
                const keybind = keybinds[i].key;
                if (a.condition(keybind)) {
                    a.cooldown.set_is_ready();

                    a.operation(player);
                    a.cooldown.start();
                };
            }
        };
    };

    get_all() {
        return this.abilities.get_all();
    };

    set_item(index, item){
        return this.abilities.set(index, SkillFactory(item));
    };
};

function SkillFactory(item) {
     switch (item.name) {
        case ABILITY_TYPE.Teleport:
            return new Teleport(item.cooldown, item.value, item.img, item.rarity, item.effect);
        case ABILITY_TYPE.Heal:
            return new Heal(item.cooldown, item.value, item.img, item.rarity, item.effect);
        case ABILITY_TYPE.Run:
            return new Run(item.cooldown, item.value, item.img, item.rarity, item.effect);
     };
};
