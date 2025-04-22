import { WeaponSheet } from "../sheet/sheet_weapon.js";
import { Magazine } from "./component/magazine.js";
import { Matrix } from "./component/matrix.js";
import { ENUMS_DATA, WEAPONS_DATA } from "../../core/fetch.js";

const DATA = WEAPONS_DATA.ricochet;
const BULLET_BEHAVIOUR = ENUMS_DATA.BulletBahviour;

export class Ricochet{
    constructor(sheet_player){
        this.type = DATA.type;
        
        const sheet_data = DATA.sheet;        
        this.sheet_weapon = new WeaponSheet({...sheet_data});
        this.matrix = new Matrix(this.sheet_weapon, sheet_player);
        this.magazine = new Magazine(this.sheet_weapon, sheet_player);
    };

    set_components(){
        this.magazine.set_magazine({ammo: false});
    };

    shoot(player_loc, monsters) {
        if(this.magazine.is_ready_attack() && monsters.length > 0){
            this.matrix.add(player_loc, BULLET_BEHAVIOUR.Closest, DATA.color, {monsters: monsters});
            this.magazine.decrement_remaining();
        };

        this.magazine.reload_magazine();
    };

    path(bullet, monsters, report) {
        bullet.movement();
        
        if(bullet.rect.location.out_of_bounds()){
            this.matrix.remove(bullet);
        };
        const closest_monster = bullet.get_closest(monsters);
        if (!bullet.set.has_monster(closest_monster) && closest_monster) {
            bullet.rect.location.set_unit_vector(closest_monster.rect.location);
        } 
        
        for (let j = 0; j < monsters.length; j++) {
            const monster = monsters[j];

            bullet.set.delete_last_monster();
            if (bullet.rect.AABB(monster.rect.location, monster.rect.dimension) && !bullet.set.has_monster(monster)) {
                bullet.set.add_monster(monster);
                monster.take_damage(bullet.damage);
                report.log_damage_dealt(this.type, bullet.damage);
                const closest_monster = bullet.get_closest(monsters.filter(x => x != monster));
                if (closest_monster) {
                    bullet.rect.location.set_unit_vector(closest_monster.rect.location);
                } else if (closest_monster == null) {
                    this.matrix.remove(bullet);
                }

                if (bullet.bounce.is_at_max_bounce()) {
                    this.matrix.remove(bullet);
                } else {
                    bullet.bounce.incrament_current();
                };
            };
        };
    };
};