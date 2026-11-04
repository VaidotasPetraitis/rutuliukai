import { canvas_trail } from "./render.js";

export class Trail {
    constructor({len, code,from,to, width}){
        this.positions = [];
        this.length = len;
        this.width = width;
        this.color = {
            code: code,
            from: from,
            to: to
        };
    };

    previous_positions(x, y) {
        if (this.positions.length < this.length) {
            this.positions.push({ x: x, y: y });
        }
        else if (this.positions.length == this.length){
            this.positions.shift();
            this.positions.push({ x: x, y: y });
        };
    };

    draw() {
        canvas_trail(this.positions, this.color, this.width);
    };

    clear() {
        this.positions = [];
    };
};