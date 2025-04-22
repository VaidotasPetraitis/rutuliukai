export class Modifier {
    constructor(_base) {
        this.base = _base;
        this.additive = 0;
        this.multiplier = 1;
        this._value = 0;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        this._value = Math.max(newValue, 0);
    }

    set_multiplier(value) {
        this.multiplier += value
    };

    set_additive(value) {
        this.additive += value
    };

    update(){
        this.value = (this.base + this.additive) * this.multiplier
    }
}