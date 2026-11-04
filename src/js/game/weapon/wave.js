import { WeaponSheet } from "../sheet/sheet_weapon.js";
import { Magazine } from "./component/magazine.js";
import { Matrix } from "./component/matrix.js";
import { WEAPONS_DATA, ENUMS_DATA } from "../../core/fetch.js";

const DATA = WEAPONS_DATA.wave;
const BULLET_BEHAVIOUR = ENUMS_DATA.BulletBahviour;

export class Wave{
    constructor(sheet_player){
        this.type = DATA.type;

        const sheet_data = DATA.sheet;        
        this.sheet_weapon = new WeaponSheet({...sheet_data});
        this.matrix = new Matrix(this.sheet_weapon, sheet_player);
        this.magazine = new Magazine(this.sheet_weapon, sheet_player);
    };

    set_components(){
        this.magazine.set_magazine();
    };

    shoot(player_loc, monsters) {
        if(this.magazine.is_ready_attack() && monsters.length > 0){
            this.matrix.add(player_loc, BULLET_BEHAVIOUR.Random, DATA.color, {monsters: monsters});
            this.magazine.decrement_remaining();
        };

        this.magazine.reload_magazine();
    };

    path(bullet, monsters, report) {
        bullet.movement();
        
        if(bullet.rect.location.out_of_bounds()){
            this.matrix.remove(bullet);
        };

        for (let j = 0; j < monsters.length; j++) {
            const monster = monsters[j];

            // bullet.set.delete_last_monster();
            if (bullet.rect.AABB(monster.rect.location, monster.rect.dimension) && !bullet.set.has_monster(monster) ) {
                bullet.set.add_monster(monster);
                monster.take_damage(bullet.damage);
                report.log_damage_dealt(this.type, bullet.damage);
            };
        };
    };
};