import { random_f_in_range } from "../../core/rng.js";
import { EXP_GAIN_DATA, EXP_SETTINGS_DATA, EXP_MULTI_DATA } from "../../core/fetch.js";

 export class Level {
    constructor() {
        this.current = EXP_SETTINGS_DATA.current;
        this.exp_required = EXP_SETTINGS_DATA.exp_required;
        this.exp_current = EXP_SETTINGS_DATA.exp_current;
        this.increase_required = EXP_GAIN_DATA;
        this.exp_multi = EXP_MULTI_DATA;
    };

    add_level() {
        if(this.exp_current >= this.exp_required){
            this.current++;
            this.set_experience_required();
            this.exp_current = 0;
            return true;
        };

        return false;
    };

    set_experience_required(){
        for (let i = 0; i < this.increase_required.length; i++) {
            const o = this.increase_required[i];
            if(this.current >= o.min && this.current <= o.max) {
                this.exp_required += o.max_gain;
            };
        };

    };

    add_experience_on_kill(value) {
        this.exp_current += value * (random_f_in_range(this.exp_multi.min, this.exp_multi.max)).toFixed(2);
    };

    clear(){
        this.current = EXP_SETTINGS_DATA.current;
        this.exp_required = EXP_SETTINGS_DATA.exp_required;
        this.exp_current = EXP_SETTINGS_DATA.exp_current;
        this.increase_required = EXP_GAIN_DATA;
        this.exp_multi = EXP_MULTI_DATA;
    };
};