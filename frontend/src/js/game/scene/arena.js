import { CANVAS_SIZE } from "../../core/canvas.js";
import { Dimension} from "../../core/dimension.js";
import { Camera } from "../camera.js";
import { Fog } from "../fog.js";
import { Frame } from "./frame.js";
import { Monsters } from "../monster/monsters.js";
import { Combat } from "../combat.js";
import { Hud } from "../hud/hud.js";
import { Upgrades } from "../upgrade/upgrades.js";
import { Timer } from "./timer.js";
import { Report } from "../report.js";
import { ENUMS_DATA } from "../../core/fetch.js";
import { AUDIO_PRELOADED, AUDIO_TYPE, AudioManager } from "../../core/audio.js";

const UPGRADE_TYPE = ENUMS_DATA.UpgradeType;
const SCENE_LIST = ENUMS_DATA.SceneList;
const COMBAT_AUDIO = AUDIO_PRELOADED[AUDIO_TYPE.Arena];

export class Arena {
    constructor(player) {
        this.type = SCENE_LIST.Arena;
        this.dimension = new Dimension({w: CANVAS_SIZE.Width, h: CANVAS_SIZE.Height});
        this.frame = new Frame();
        this.report = new Report();
        this.timer = new Timer();
        this.player = player;
        this.upgrades = new Upgrades();
        this.monsters = new Monsters();
        this.camera = new Camera();
        this.fog = new Fog();
        this.combat = new Combat(player, this.monsters, this.report);
        this.hud = new Hud();
        this.is_paused = false;
        this.game_over = false;
        this.scene_over = false;
    };

    update(timestamp) {
        if(!this.is_paused && !this.game_over) {
            this.timer.get_running_ts(timestamp);
            this.camera.movement(this.player);
            this.draw();
            this.player.movement();
            this.player.abilities.use(this.player);
            if(this.player.level.add_level()) {
                this.is_paused = true;
            };

            this.monsters.generate_monsters(
                this.frame.counter, 
                this.timer.get_ts(), 
                this.is_paused, 
                this.player.level.current, 
                this.player.rect.location, 
                this.camera.scale.offset
            );

            this.monsters.update(this.player);
            this.monsters.remove_on_death(this.player, this.report);
            this.combat.update(this.report);
            this.fog.set_background(this.player.sheet.get_specific_health_fields());
            this.hud.html_update_player_interface(this.player, this.timer.get_ts(), this.upgrades.get_upgrades_equipped(), this.report);
            
            if(this.player.is_dead() || this.timer.current_time.m == "11") {
                this.hud.html_remove_player_interface();

                this.report.log_final_time(this.timer.get_ts());
                this.report.log_level(this.player.get_level());
                this.report.set_dps()

                this.hud.html_build_report(this.report, this.upgrades.get_upgrades_equipped());
                this.game_over = true;
            };
            
            this.frame.incrament();
        } else if (this.is_paused && !this.game_over) {
            AudioManager.setPlaybackRate(0.75);
            this.timer.get_paused_ts(timestamp);
            
            if(!this.hud.html_upgrades_interface_clicked()) {
                this.draw();
                this.upgrades.set_choices(this.player.weapons.get_all());

                if(this.upgrades.get_choices_size() == 0) {
                    this.player.sheet.set_health_to_full();
                    this.unpause();
                } else {
                    this.hud.html_build_upgrades_interface(this.upgrades.upgrades_choice.get_all());
                    this.hud.html_remove_player_interface();                
                }
                
            } else if (this.hud.html_upgrades_interface_clicked()) {
                
                for (let i = 0; i < this.upgrades.get_choices_size(); i++) {
                    const upgrade = this.upgrades.get_choice(i);
                    if(upgrade.selected) {
                        if(upgrade.type == UPGRADE_TYPE.Player) {
                            this.player.sheet.set_specific_modifier_type(upgrade.modifier.name, upgrade.modifier.type, upgrade.tier.value);
                        } else if(upgrade.type == UPGRADE_TYPE.Weapon) {
                            this.player.weapons.add_specific_weapon(upgrade.weapon);
                            this.upgrades.set_pool_from_db(upgrade.weapon);
                            this.upgrades.add_equipped(upgrade);
                            this.report.log_weapon_time(upgrade.weapon, this.timer.get_ts());
                        } else {
                            this.player.sheet.set_health_to_full();
                            this.player.weapons.set_specific_sheet(upgrade);
                        };
                        this.player.weapons.set_components();
                        upgrade.level_up();
                        if (upgrade.source == 'pool') {
                            delete upgrade.source;
                            this.upgrades.remove_pool(upgrade);
                            this.upgrades.add_equipped(upgrade);
                        } else if (upgrade.source == 'db_legendary') {
                            delete upgrade.source;
                            this.upgrades.remove_db_legendary(upgrade);
                            this.upgrades.add_equipped(upgrade);
                        };
                    };
                };

                this.upgrades.clear_choices();
                this.hud.html_close_upgrades_interface();
                this.unpause();
            };
        } else if (!this.is_paused && this.game_over && this.hud.html_death_interface_clicked()){
            this.scene_over = true;
        };
    };

    unpause() {
        AudioManager.setPlaybackRate(1);
        this.hud.html_build_player_interface(this.player, this.upgrades.get_upgrades_equipped());
        this.is_paused = false;
    };

    is_scene_over(){
        return this.scene_over;
    };

    setup(timestamp){
        AudioManager.playAudio(COMBAT_AUDIO.background, true);
        this.timer.set_start_ts(timestamp);
        this.player.sheet.set_health_to_full();
        const upgrade = this.upgrades.random_item_from_weapons_db();
        upgrade.level_up();
        this.player.weapons.add_specific_weapon(upgrade.weapon);
        this.upgrades.add_equipped(upgrade);
        this.upgrades.set_pool_from_db('Player');
        this.upgrades.set_pool_from_db(this.player.weapons.get_all().get(0).type)
        this.report.log_weapon_time(upgrade.weapon, { m: "00", s: "01" });
        this.hud.html_build_player_interface(this.player, this.upgrades.get_upgrades_equipped());
    };

    dispose(){
        AudioManager.stopAllAudio();
        this.monsters.clear();
        this.player.clear();
        this.upgrades.clear();
        this.timer.clear();
        this.frame.clear();
        this.report.clear();
        this.scene_over = false;
        this.game_over = false;
    };

    draw() {
        this.camera.draw();
        this.player.draw();
        this.monsters.draw();
        this.player.weapons.draw();
        this.fog.draw(this.player);
    };
};