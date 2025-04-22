import { WeaponSheet } from "../sheet/sheet_weapon.js";
import { Magazine } from "./component/magazine.js";
import { Matrix } from "./component/matrix.js";
import { WEAPONS_DATA, ENUMS_DATA } from "../../core/fetch.js";

const DATA = WEAPONS_DATA.ray;
const BULLET_BEHAVIOUR = ENUMS_DATA.BulletBahviour;
    
export class Ray{
    constructor(sheet_monster){
        const sheet_data = DATA.sheet;        
        this.sheet_weapon = new WeaponSheet({...sheet_data});
        this.matrix = new Matrix(this.sheet_weapon, sheet_monster);
        this.magazine = new Magazine(this.sheet_weapon, sheet_monster);
    };

    shoot(player, monster_loc) {
        path(player, this.matrix);

        if(this.magazine.is_ready_attack()){
            this.matrix.add(monster_loc, BULLET_BEHAVIOUR.Player, DATA.color, {player_loc: player.rect.location});
            this.magazine.decrement_remaining();
        };

        this.magazine.reload_magazine();
    };
};

function path(player, matrix) {
    for (let i = 0; i < matrix.size(); i++) {
        const b = matrix.get(i);
        b.movement();
        if (b.rect.location.out_of_bounds()) {
            matrix.remove(b);
        };
        
        b.set.delete_last_monster();
        if(b.rect.AABB(player.rect.location, player.rect.dimension) && !b.set.has_monster(player)){
            b.set.add_monster(player);
            player.take_damage(b.damage);
        };
    };
};