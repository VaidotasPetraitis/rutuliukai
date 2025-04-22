import { ENUMS_DATA } from "../../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;

export class Magazine {
    constructor(sheet_weapon, sheet_player) {
        this.bullets = [];
        this.sheet_player = sheet_player;
        this.sheet_weapon = sheet_weapon;
        this.remaining = this.get_projectiles();
        this.capacity = this.get_projectiles();
        this.reload = {
            time: this.get_attack_rate(),
            ongoing: false,
            interval: null
        };
    };

    set_magazine() {
            this.reload.time = this.get_attack_rate();
            this.remaining = this.get_projectiles();
            this.capacity = this.get_projectiles();
    };

    reload_magazine() {
        if (!this.reload.ongoing && this.remaining == 0) {
            this.reload.ongoing = true;
            this.reload.interval = setInterval(() => {
                if (this.remaining < this.capacity) {
                    this.remaining++;
                }
                else {
                    this.reload.ongoing = false;
                    clearInterval(this.reload.interval);
                    this.reload.interval = null;
                };
            }, this.reload.time / this.capacity);
        };
    };

    get_projectiles() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.Projectiles) + this.sheet_player.get_modifier_value(MODIFIER.Projectiles);
    };

    get_attack_rate() {
        return this.sheet_weapon.get_modifier_value(MODIFIER.AttackRate) * this.sheet_player.get_modifier_value(MODIFIER.Cooldown);
    };

    is_ready_attack() {
        return !this.reload.ongoing && this.remaining > 0;
    };

    decrement_remaining() {
        return this.remaining--;
    };
};