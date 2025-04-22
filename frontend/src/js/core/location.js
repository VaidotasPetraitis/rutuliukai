import { CANVAS_SIZE } from "./canvas.js";

export class Location {
    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.vector = {
            nx: 0,
            ny: 0
        };
    }

    unit_vector(o) {
        const diff_x = this.x - o.x;
        const diff_y = this.y - o.y;
        const mag = Math.sqrt(diff_x ** 2 + diff_y ** 2);

        return {nx: (diff_x / mag) * -1, ny: (diff_y / mag) * -1}
    };
    
    set_unit_vector(o) {
        const diff_x = this.x - o.x;
        const diff_y = this.y - o.y;
        const mag = Math.sqrt(diff_x ** 2 + diff_y ** 2);

        this.vector = {nx: (diff_x / mag) * -1, ny: (diff_y / mag) * -1};
    };

    out_of_bounds() {
        if(this.x > CANVAS_SIZE.Width || this.x < 0 || this.y > CANVAS_SIZE.Height || this.y < 0 ) {
            return true;
        };

        return false;
    };
};