export class Card {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.modifier = {
            name: data.modifier,
            type: data.modifier_type
        };
        this.type = data.type;
        this.description = data.description;
        this.img = data.img;
        this.lv = {
            current: data.lv,
            max: data.lv_max
        };
        this.tier = {
            rarity: data.rarity,
            value: data.value
        };
        this.selected = false;
        this.source = null;
        this.weapon = data.weapon;
    };

    associate_tier(tier) {
        this.tier.rarity = tier.rarity;
        this.tier.value = tier.value;
        return this;
    };

    is_upgradable() {
        return this.lv.current < this.lv.max;
    }

    unselect(){
        this.selected = false;
    }

    level_up() {
        this.lv.current++;
    };
};