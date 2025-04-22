export class BulletBounce {
    constructor(bounce) {
        this.current = 0;
        this.max = bounce;
    };

    is_at_max_bounce() {
        return this.current == (this.max - 1);
    };

    incrament_current() {
        this.current++;
    }
};