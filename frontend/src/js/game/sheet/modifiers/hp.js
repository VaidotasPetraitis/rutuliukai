import { Modifier } from "../modifier.js";

export class Hp extends Modifier{
    constructor(_base) {
        super(_base);
        this.value_max;
        this.value_remaining;
    };

    update(){
        super.update();
        this.value_max = this.value;
    };
};