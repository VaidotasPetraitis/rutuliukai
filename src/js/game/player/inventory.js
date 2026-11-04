export class Inventory {
    constructor() {
        this.gold = 1000;
    };
    
    add_gold_on_kill(value) {
        this.gold += value;
    };

    get_gold() {
        return this.gold;
    };

    minus_gold(value) {
        this.gold -= value;
    };
};