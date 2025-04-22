import { random_int_in_range } from "../../core/rng.js";

export class OnDeath {
    constructor({exp, gold_min, gold_max}) {
        this.exp = exp;
        this.gold = random_int_in_range(gold_min, gold_max);
        this.points = random_int_in_range(1,3);
    };

    get_points() {
        return this.points;
    };

    get_exp() {
        return this.exp;
    };

    get_gold() {
        return this.gold;
    };
};