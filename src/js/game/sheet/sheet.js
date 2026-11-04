import { Area } from "./modifiers/area.js";
import { Cooldown } from "./modifiers/cooldown.js";
import { Damage } from "./modifiers/damage.js";
import { Hp } from "./modifiers/hp.js";
import { MovementSpeed } from "./modifiers/movement_speed.js";
import { Projectile } from "./modifiers/projectile.js"
import { HashMap } from "../../core/hashmap.js";
import { WeaponSpeed } from "./modifiers/weapon_speed.js";
import { ENUMS_DATA } from "../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;
const MODIFIER_TYPE = ENUMS_DATA.ModifierType;

export class Sheet {
    constructor({ area, cooldown, damage, hp, projectiles, movement_speed , weapon_speed  }) {
        this.modifier = new HashMap({
            data: {
                [MODIFIER.Area]: new Area(area),
                [MODIFIER.Cooldown]: new Cooldown(cooldown),
                [MODIFIER.Damage]: new Damage(damage),
                [MODIFIER.Hp]: new Hp(hp),
                [MODIFIER.Projectiles]: new Projectile(projectiles),
                [MODIFIER.MovementSpeed]: new MovementSpeed(movement_speed),
                [MODIFIER.WeaponSpeed]: new WeaponSpeed(weapon_speed),
            }
        });

        this.update();
    };

    update() {
        for (const key of this.modifier.keys()) {
            const m = this.modifier.get(key)
            m.update();
        };
    };

    get_modifier_value(key) {
        return this.modifier.get(key).value;
    };

    get_specific_health_fields() {
        return this.modifier.get(MODIFIER.Hp);
    };

    set_health_to_full(){
        this.modifier.get(MODIFIER.Hp).update();
    };

    set_modifier_base(key, value) {
        this.modifier.get(key).base += value;
    };

    set_specific_modifier_value(key, value) {
        this.modifier.get(key).value += value;
    };

    set_specific_modifier_type(key, type, value) {
        const modifier = this.modifier.get(key);
        if (type == MODIFIER_TYPE.Additive) {
            modifier.set_additive(value);
        } else if (type == MODIFIER_TYPE.Multipler) {
            modifier.set_multipler(value);
        };

        this.update();
    };
};