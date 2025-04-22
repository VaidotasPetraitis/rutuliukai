import { Area } from "./modifiers/area.js";
import { AttackRate } from "./modifiers/attack_rate.js";
import { Damage } from "./modifiers/damage.js";
import { Projectile } from "./modifiers/projectile.js"
import { HashMap } from "../../core/hashmap.js";
import { WeaponSpeed } from "./modifiers/weapon_speed.js";
import { TrailLength } from "./modifiers/trail.js";
import { Bounce} from "./modifiers/bounce.js";
import { Orbit } from "./modifiers/orbit.js";
import { ENUMS_DATA } from "../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;
const MODIFIER_TYPE = ENUMS_DATA.ModifierType;

export class WeaponSheet {
    constructor({area, attack_rate, damage, projectiles, weapon_speed, trail_length, bounce, orbit} = {}) {
        this.modifier = new HashMap({
            data: {
                [MODIFIER.Area]: new Area(area),
                [MODIFIER.AttackRate]: new AttackRate(attack_rate),
                [MODIFIER.Damage]: new Damage(damage),
                [MODIFIER.Projectiles]: new Projectile(projectiles),
                [MODIFIER.WeaponSpeed]: new WeaponSpeed(weapon_speed),
                [MODIFIER.TrailLength]: new TrailLength(trail_length),
                [MODIFIER.Bounce]: new Bounce(bounce),
                [MODIFIER.Orbit]: new Orbit(orbit)
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

    update_all_with_player_sheet(player_sheet) {
        for (const key of this.modifier.keys()) {
            const m = this.modifier.get(key);
            m.base += player_sheet.get_modifier_value(key);
            m.update();
        };
    };

    update_specific_using_player_sheet(player_sheet, key) {
        this.set_specific_modifier_base(key, player_sheet.get_modifier_value(key));
        this.update();
    };

    set_specific_modifier_type(key, type, value) {
        const m = this.modifier.get(key);
        if(type == MODIFIER_TYPE.Additive) {
            m.set_additive(value);
        } else if(type == MODIFIER_TYPE.Multipler) {
            m.set_multipler(value);
        };
        this.update();
    };

    get_modifier_value(key) {
        return this.modifier.get(key).value;
    };
    
    set_specific_modifier_base(key, value) {
        this.modifier.get(key).base += value;
    }
};