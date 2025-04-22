export class Kills {
    constructor() {
        this.kills = 0; 
    };

    get() {
        return this.kills;
    }

    add() {
        this.kills++;
    };

    clear() {
        this.kills = 0;
    };
};