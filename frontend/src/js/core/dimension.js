export class Dimension {
    constructor({w, h}) {
        this.width = w;
        this.height = h;
        this.radius = this.width / 2;
    };

    get_area() {
        return this.width * this.height;
    };

    set_radius() {
        this.radius = this.width / 2;
    };
};