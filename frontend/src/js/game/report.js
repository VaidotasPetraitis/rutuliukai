import { REPORT_DATA } from "../core/fetch.js";

export class Report {
    constructor() {
        this.weapons = JSON.parse(JSON.stringify(REPORT_DATA.weapons));
        this.stats =  JSON.parse(JSON.stringify(REPORT_DATA.stats));
    };

    log_kill() {
        this.stats.kills++;
    };

    log_gold(value) {
        this.stats.gold_earned += value;
    };

    log_damage_dealt(weapon, value) {
        this.weapons[weapon].damage += Math.floor(value);
    };

    log_weapon_time(weapon, value) {
        this.weapons[weapon].time = parseInt(value.m * 60) + parseInt(value.s);
    };

    log_final_time(value) {
        this.stats.time = parseInt(value.m * 60) + parseInt(value.s);
        this.stats.time_formatted = `${value.m}:${value.s}`;
    };

    log_level(value) {
        this.stats.level = value;
    };

    log_damage_taken(value) {
        this.stats.damage_taken += value;
    }

    get_kills(){
        return this.stats.kills;
    };

    set_upgrades(value) {
        this.stats.upgrades = value
    }

    set_dps() {
        for (const key in this.weapons) {
            const w = this.weapons[key];
            if(w.damage > 0 ) {
                w.duration = this.stats.time - w.time;
                var minutes = Math.floor(w.duration / 60);
                var remaining_s = w.duration % 60;
                w.format_duration = minutes.toString().padStart(2, '0') + ':' + remaining_s.toString().padStart(2, '0');

                w.dps = (w.damage / w.duration).toFixed(2);
            }
        };
    };

    clear() {
        this.weapons = JSON.parse(JSON.stringify(REPORT_DATA.weapons));
        this.stats =  JSON.parse(JSON.stringify(REPORT_DATA.stats));
    };
};