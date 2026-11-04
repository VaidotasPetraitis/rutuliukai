import { Rectangle } from "../../../core/rectangle.js";
import { random_int_in_range } from "../../../core/rng.js";
import { Trail } from "../../../core/trail.js";
import { BulletBounce } from "./bullet_bounce.js";
import { BulletColissionSet } from "./bullet_colission_set.js";
import { BulletOrbit } from "./bullet_orbit.js";
import { ENUMS_DATA } from "../../../core/fetch.js";

const BULLET_BEHAVIOUR = ENUMS_DATA.BulletBahviour;

export class Bullet {
    constructor({loc, behaviour, width, height, bounce, damage, speed, trail_length, orbit, color}) {
        this.rect = new Rectangle({
            x: loc.x,
            y: loc.y, 
            w: width, 
            h: height
        });

        this.bounce = new BulletBounce(bounce);
        this.set = new BulletColissionSet();
        this.orbit = new BulletOrbit(orbit);
        
        this.color = color.body;
        this.trail = new Trail({
            len: trail_length,
            code: color.trail,
            from: 0,
            to: 0.8,
            width: this.rect.dimension.width
        });

        this.behaviour = behaviour;
        this.damage = damage;
        this.speed = speed;
    };

    set_vector(monsters, player_loc) {
        switch (this.behaviour) {
            case BULLET_BEHAVIOUR.Player:
            this.rect.location.set_unit_vector(player_loc);
            break;
            case BULLET_BEHAVIOUR.Closest:
            this.rect.location.set_unit_vector(this.get_closest(monsters).rect.location);
            break;
            case BULLET_BEHAVIOUR.Random:
            this.rect.location.set_unit_vector(this.get_random(monsters).rect.location);
            break;
            case BULLET_BEHAVIOUR.None:
            break;
        };
    };

    movement({orbit = false,  player_loc = 0} = {}) {
        if(orbit) movement_orbit(this.rect.location, this.orbit, this.speed, player_loc);
        else if (!orbit) movement_vector(this.rect.location, this.rect.location.vector, this.speed);
        this.trail.previous_positions(this.rect.location.x + this.rect.dimension.width / 2, this.rect.location.y + this.rect.dimension.height / 2);
    };

    get_closest(monsters) {
        let distance = Infinity;
        return monsters.reduce((closest, current) => {
            const hypot = Math.hypot(current.rect.location.x - this.rect.location.x, current.rect.location.y - this.rect.location.y);
            if (hypot < distance) {
                closest = current;
                distance = hypot;
            };
            return closest;
        }, null);
    };

    get_random(monsters) {
        const random = random_int_in_range(0, monsters.length);
        return monsters[random];
    };
};

function movement_vector(b_loc, vector, speed) {
    b_loc.x += vector.nx * speed;
    b_loc.y += vector.ny * speed;
};

function movement_orbit(b_loc, orbit, speed, player_loc) {
    orbit.radiants += speed;
    b_loc.x = player_loc.x + Math.cos(orbit.radiants) * (orbit.distance);
    b_loc.y = player_loc.y + Math.sin(orbit.radiants) * (orbit.distance);
};