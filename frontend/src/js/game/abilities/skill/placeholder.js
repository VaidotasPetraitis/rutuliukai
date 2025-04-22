import { Cooldown } from "../cooldown.js";
import { ABILITIES_DATA } from "../../../core/fetch.js";

const DATA = ABILITIES_DATA.placeholder;

export class Placeholder {
    constructor() {
        this.placeholder = true;        
        this.rarity = DATA.rarity;
        this.cooldown = new Cooldown();
        this.img = DATA.img;
    };

    valid(){
        return false;
    };
};