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
    
    draw() {
        canvas_transformation(this.offset, this.scale, {fill_style: "#1b1b1b"});
    };
};