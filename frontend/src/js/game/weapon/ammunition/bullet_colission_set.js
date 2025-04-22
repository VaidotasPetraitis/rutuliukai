export class BulletColissionSet {
    constructor() {
        this.unique_colissions = new Set();
        this.order = [];
    }

    add_monster(monster) {
        this.unique_colissions.add(monster);
        this.order.push(monster);
    };

    delete_last_monster() {
        if (this.order.length > 1) {
            let oldest_colission = this.order.shift();
            this.unique_colissions.delete(oldest_colission);
        };
    };

    has_monster(monster) {
        return this.unique_colissions.has(monster);
    };
};