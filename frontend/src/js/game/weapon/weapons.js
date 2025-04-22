import { Collection } from "../../core/collection.js";
import { HashMap } from "../../core/hashmap.js";
import { Wave } from "./wave.js";
import { Ricochet } from "./ricochet.js";
import { Spiral } from "./spiral.js";
import { ENUMS_DATA } from "../../core/fetch.js";

const WEAPON_TYPE = ENUMS_DATA.WeaponType;

export class Weapons {
    constructor(sheet_player) {
        this.weapons = new Collection();
        this.available = new HashMap({ data: {
            [WEAPON_TYPE.Wave]: new Wave(sheet_player),
            [WEAPON_TYPE.Ricochet]: new Ricochet(sheet_player),
            [WEAPON_TYPE.Spiral]: new Spiral(sheet_player)
        }});
    };

    add_specific_weapon(key) {
        this.add(this.available.get(key));
    };

    set_specific_sheet(upgrade){
        for (let i = 0; i < this.weapons.size(); i++) {
            const w = this.weapons.get(i);
            if(w.type == upgrade.type) {
                const modifier_count = upgrade.modifier.name.split(',');
                if(modifier_count.length > 1) {
                    debugger
                    for (let j = 0; j < modifier_count.length; j++) {
                        const modifier = modifier_count[j];
                        const value = upgrade.tier.value[j];
                        w.sheet_weapon.set_specific_modifier_type(modifier, upgrade.modifier.type, value);
                    };
                } else {
                    w.sheet_weapon.set_specific_modifier_type(upgrade.modifier.name, upgrade.modifier.type, upgrade.tier.value);
                };
            };
        };
    };

    set_components() {
        for (let i = 0; i < this.weapons.size(); i++) {
            const w = this.weapons.get(i);
            w.set_components();
        };
    };

    add(weapon) {
        this.weapons.add(weapon);
    };

    get_all() {
        return this.weapons;
    }

    draw() {
        for (let i = 0; i < this.weapons.size(); i++) {
            const weapon = this.weapons.get(i);
            weapon.matrix.draw();
        };
    };

    attack(monsters) {
        for (let i = 0; i < this.weapons.size(); i++) {
            const weapon = this.weapons.get(i);
            weapon.attack(monsters)
        };
    };

    set_available_weapons(sheet_player) {
        this.available = new HashMap({ data: {
            [WEAPON_TYPE.Wave]: new Wave(sheet_player),
            [WEAPON_TYPE.Ricochet]: new Ricochet(sheet_player),
            [WEAPON_TYPE.Spiral]: new Spiral(sheet_player)
        }});
    };

    clear(sheet_player){
        this.weapons.clear();
        this.set_available_weapons(sheet_player);
    };
};