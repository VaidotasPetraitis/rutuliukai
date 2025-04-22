import { Dimension } from "./dimension.js";
import { Location } from "./location.js";
import { canvas_filled_rectangle, canvas_hollow_rectangle, canvas_filled_circle } from "./render.js";

export class Rectangle {
    constructor({x,y,w,h}){
        this.location = new Location({x, y});
        this.dimension = new Dimension({w, h});
    };

    AABB(o_loc, o_dim) {
        if (this.location.x < o_loc.x + o_dim.width &&
            this.location.x + this.dimension.width > o_loc.x &&
            this.location.y < o_loc.y + o_dim.height &&
            this.location.y + this.dimension.height > o_loc.y) {
            return true;
        }
        else {
            return false;
        };
    };

    draw({fill_style = null, filled = true, circle = false} = {}) {
        
        if(circle) {
            canvas_filled_circle(this.location, this.dimension, {fill_style: fill_style});
        };

        if(filled && !circle) {
            canvas_filled_rectangle(this.location, this.dimension, { fill_style: fill_style });
        } else if( !filled && !circle) {
            canvas_hollow_rectangle(this.location, this.dimension, { stroke_style: fill_style })
        }
    };

    avoidance(monsters, is_player_moving) {
        let max_force = 2;

        if (is_player_moving) {
            max_force = 1;
        } else if (!is_player_moving) {
            max_force = 2;
        };

        const avoidance_distance = 16;
        let total_force = {x: 0, y: 0};
        let count = 0;
    
        for (let i = 0; i < monsters.length; i++) {
            const m = monsters[i];
            if(m.rect != this) {
                const dx = m.rect.location.x + m.rect.dimension.width / 2 - (this.location.x + this.dimension.width / 2);
                const dy = m.rect.location.y + m.rect.dimension.height / 2 - (this.location.y + this.dimension.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < avoidance_distance && distance > 0) {
                    const scaleFactor = Math.min(max_force, (avoidance_distance - distance) / avoidance_distance);
                    const avoidance_force_x = dx * scaleFactor;
                    const avoidance_force_y = dy * scaleFactor;
                    total_force.x += avoidance_force_x;
                    total_force.y += avoidance_force_y;
                    count++;
                };
            };
        };
        if (count > 0) {
            const mag = Math.sqrt(total_force.x * total_force.x + total_force.y * total_force.y);
            total_force.x /= mag;
            total_force.y /= mag;

    
            this.location.x -= total_force.x * max_force;
            this.location.y -= total_force.y * max_force;
        };
    };
};