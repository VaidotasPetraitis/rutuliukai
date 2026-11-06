import { Location } from "../core/location.js";
import { CANVAS_SIZE } from "../core/canvas.js";
import { canvas_transformation } from "../core/render.js"; 

export class Camera {
    constructor(){
        this.center_location = new Location({x: CANVAS_SIZE.Width / 2, y: CANVAS_SIZE.Height / 2});
        this.scale = {
            offset: new Location({x: - (CANVAS_SIZE.Width / 4), y: - (CANVAS_SIZE.Height / 4)}),
            factor: 2
        } 
        this.offset = new Location({x: 0, y: 0});
    };

    movement(player) {
        const player_location = player.rect.location;
        if(player_location.y - Math.abs(this.scale.offset.y) > 0 && player_location.y + Math.abs(this.scale.offset.y) < CANVAS_SIZE.Height) {
            this.offset.y = player_location.y - this.center_location.y;
        }  
        if(player_location.x - Math.abs(this.scale.offset.x) > 0 && player_location.x + Math.abs(this.scale.offset.x) < CANVAS_SIZE.Width) {
            this.offset.x = player_location.x - this.center_location.x;
        }  
    }
    
    is_visible(rect, trail = null) {
        const left = this.offset.x - this.scale.offset.x;
        const top = this.offset.y - this.scale.offset.y;
        const right = left + CANVAS_SIZE.Width / this.scale.factor;
        const bottom = top + CANVAS_SIZE.Height / this.scale.factor;
        let min_x = rect.location.x - 1;
        let min_y = rect.location.y - 1;
        let max_x = rect.location.x + rect.dimension.width + 1;
        let max_y = rect.location.y + rect.dimension.height + 1;

        if (max_x >= left && min_x <= right && max_y >= top && min_y <= bottom) return true;

        if (trail) {
            const padding = trail.width / 2 + 1;
            for (let i = 0; i < trail.positions.length; i++) {
                const position = trail.positions[i];
                min_x = Math.min(min_x, position.x - padding);
                min_y = Math.min(min_y, position.y - padding);
                max_x = Math.max(max_x, position.x + padding);
                max_y = Math.max(max_y, position.y + padding);
            };
        };

        return max_x >= left && min_x <= right && max_y >= top && min_y <= bottom;
    };

    draw() {
        canvas_transformation(this.offset, this.scale, {fill_style: "#1b1b1b"});
    };
};
