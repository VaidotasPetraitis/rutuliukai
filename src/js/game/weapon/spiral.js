import { WeaponSheet } from "../sheet/sheet_weapon.js";
import { Matrix } from "./component/matrix.js";
import { ENUMS_DATA, WEAPONS_DATA } from "../../core/fetch.js";

const DATA = WEAPONS_DATA.spiral;
const MODIFIER = ENUMS_DATA.Modifier;
const BULLET_BEHAVIOUR = ENUMS_DATA.BulletBahviour;

export class Spiral{
    constructor(sheet_player){
        this.sheet_player = sheet_player;
        this.type = DATA.type;

        const sheet_data = DATA.sheet;        
        this.sheet_weapon = new WeaponSheet({...sheet_data});
        this.matrix = new Matrix(this.sheet_weapon, sheet_player);
        this.realod_time = this.get_attack_rate();
        this.projectiles = this.get_projectiles();
        this.interval = null;
    };

    set_components() {
        this.projectiles = this.get_projectiles();
        this.realod_time = this.get_attack_rate();
        this.matrix.update_existing_bullets();
    };

    shoot(player_loc, monsters) {
        if(this.is_ready_add_proj() && !this.interval){
            this.interval = setInterval(() => {
                if (this.is_ready_add_proj()) {
                    this.matrix.add(player_loc, BULLET_BEHAVIOUR.None, DATA.color, {monsters: monsters});
                } else {
                    this.interval = clearInterval(this.interval);
                }
            }, this.realod_time);
        };
    };

    is_ready_add_proj() {
        return this.matrix.size() < this.projectiles;
    };

    path(bullet, monsters, report, player_loc) {
        bullet.movement({orbit: true, player_loc: player_loc});
        for (let j = 0; j < monsters.length; j++) {
            const monster = monsters[j];

            bullet.set.delete_last_monster();
            if (bullet.rect.AABB(monster.rect.location, monster.rect.dimension) && !bullet.set.has_monster(monster) ) {
                bullet.set.add_monster(monster);
                monster.take_damage(bullet.damage);
                report.log_damage_dealt(this.type, bullet.damage);
            };
        };
    };

    get_projectiles() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Projectiles) + this.sheet_player.get_modifier_value(MODIFIER.Projectiles);
    };

    get_attack_rate() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.AttackRate) * this.sheet_player.get_modifier_value(MODIFIER.Cooldown);
    };
};