import { Rectangle } from "../../core/rectangle.js"
import { Sheet } from "../sheet/sheet.js";
import { canvas_filled_circle } from "../../core/render.js";
import { MonsterStrategy } from "./strategy.js";
import { OnDeath } from "./on_death.js";
import { ENEMIES_DATA, ENUMS_DATA } from "../../core/fetch.js";
import { AUDIO_PRELOADED, AUDIO_TYPE, AudioManager } from "../../core/audio.js";

const DATA = ENEMIES_DATA.archer;
const MODIFIER = ENUMS_DATA.Modifier;
const MONSTER_TYPE = ENUMS_DATA.MonsterType;
const COMBAT_AUDIO = AUDIO_PRELOADED[AUDIO_TYPE.Arena];

export class Archer{
    constructor(player_level, loc){
        this.type = MONSTER_TYPE.Archer;
        this.rect = new Rectangle({
            x: loc.x,
            y: loc.y,
            w: DATA.dimension.width,
            h: DATA.dimension.height
        });
        
        const sheet_data = DATA.sheet_data;
        this.sheet = new Sheet({...sheet_data, hp: sheet_data.hp + player_level});
        this.strategy = new MonsterStrategy({...DATA.strategy, sheet: this.sheet});
        this.on_death = new OnDeath({...DATA.on_death});    
    };

    draw(camera) {
        if (camera.is_visible(this.rect)) {
            canvas_filled_circle(this.rect.location, this.rect.dimension, {fill_style: DATA.color.body, hp: this.sheet.get_specific_health_fields()});
        };
        this.strategy.weapon.matrix.draw(camera);
    };
    
    update(player) {
        this.strategy.execute(player, this.rect.location, this.sheet);
    };

    take_damage(value) {
        AudioManager.playAudio(COMBAT_AUDIO.monster_hit);
        this.sheet.set_specific_modifier_value(MODIFIER.Hp, -value);
    };
    
    is_dead(){
        return this.sheet.get_modifier_value(MODIFIER.Hp) <= 0;
    };
};
