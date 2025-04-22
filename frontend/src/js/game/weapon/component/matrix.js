import { ENUMS_DATA } from "../../../core/fetch.js";
import { Bullet } from "../ammunition/bullet.js";

const MODIFIER = ENUMS_DATA.Modifier;

export class Matrix {
    constructor(sheet_weapon, sheet_player) {
        this.bullets = [];
        this.sheet_player = sheet_player;
        this.sheet_weapon = sheet_weapon;
    }

    add(loc, behaviour, color, {monsters = null, player_loc = null} = {}) {
        let bullet = new Bullet({
            loc: loc,
            behaviour: behaviour,
            width: this.get_area(),
            height: this.get_area(),
            bounce: this.get_bounce(),
            damage: this.get_damage(),
            speed: this.get_speed(),
            trail_length: this.get_trail(),
            orbit: this.get_orbit(),
            color: color
        });

        bullet.set_vector(monsters, player_loc);
        this.bullets.push(bullet);
    };

    draw() {
        for (let i = 0; i < this.bullets.length; i++) {
            const b = this.bullets[i];
            b.rect.draw({fill_style: b.color, filled: true, circle: true });
            b.trail.draw();
        };
    };

    update_existing_bullets() {
        for (let i = 0; i < this.bullets.length; i++) {
            const b = this.bullets[i];
            b.rect.dimension.width = this.get_area();
            b.rect.dimension.height = this.get_area();
            b.rect.dimension.set_radius();
            b.damage = this.get_damage();
            b.speed = this.get_speed();
            b.trail.length = this.get_trail();
            b.trail.width = this.get_area();
            b.orbit.set_distance(this.get_orbit());
        };
    };

    get_all() {
        return this.bullets;
    };

    get(index){
        return this.bullets[index];
    };

    size(){
        return this.bullets.length;
    };

    remove(b) {
        const index = this.bullets.indexOf(b);
        this.bullets.splice(index, 1);
    };

    get_area() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Area) * this.sheet_player.get_modifier_value(MODIFIER.Area);
    };

    get_damage() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Damage) * this.sheet_player.get_modifier_value(MODIFIER.Damage);
    };

    get_speed() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.WeaponSpeed) * this.sheet_player.get_modifier_value(MODIFIER.WeaponSpeed);
    };

    get_bounce() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Bounce) + this.sheet_player.get_modifier_value(MODIFIER.Projectiles) + this.sheet_weapon.get_modifier_value(MODIFIER.Projectiles);
    };

    get_trail(){
        return Math.floor((this.sheet_weapon.get_modifier_value(MODIFIER.TrailLength)) * this.sheet_player.get_modifier_value(MODIFIER.Area));
    };

    get_orbit() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Orbit);
    };
};
