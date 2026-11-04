import { random_int_in_range } from "../../../core/rng.js";

export class BulletOrbit {
    constructor(orbit) {
        this.buffer = orbit;
        this.distance = random_int_in_range(25, 50) + this.buffer;
        this.radiants = Math.random() * Math.PI * 2;
    };

    set_distance(value) {
        // So that psiral range is increased only when we upgrade its range.
        if(value > this.buffer) {
            this.distance += value;
            this.buffer = value;
        };
    };
};