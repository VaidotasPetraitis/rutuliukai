import { DeathBar } from "./parts/death.js";
import { ExperienceBar } from "./parts/exp.js";
import { GoldBar } from "./parts/gold.js";
import { HealthBar } from "./parts/hp.js";
import { KillBar } from "./parts/kill.js";
import { MenuOptionsBar } from "./parts/menu_options.js";
import { SettingsBar } from "./parts/settings.js";
import { ShopBar } from "./parts/shop.js";
import { SkillBar } from "./parts/skill.js";
import { TimeBar } from "./parts/time.js";
import { UpgradeCards } from "./parts/upgrade.js";
import { UpgradeSlots } from "./parts/upgrade_slots.js";

export class Hud {
constructor(){
        this.hp = new HealthBar();
        this.exp = new ExperienceBar();
        this.skills = new SkillBar();
        this.upgrades = new UpgradeCards();
        this.time = new TimeBar();
        this.upgrade_slots = new UpgradeSlots();
        this.gold = new GoldBar();
        this.kill = new KillBar();
        this.death = new DeathBar();
        this.menu_options = new MenuOptionsBar();
        this.shop = new ShopBar();
        this.settings = new SettingsBar();
        this.can_remove = false; 
    };
    
    html_build_player_interface(player, equipped_upgrades) {
        if(!this.can_remove) {
            this.hp.html_build_health();
            this.exp.html_build_exp();
            this.upgrade_slots.html_build_upgrade_slots(equipped_upgrades);
            this.skills.html_build_skills(player.abilities.get_all());
            this.time.html_build_time();
            this.gold.html_build_gold();
            this.kill.html_build_kill();
            this.can_remove = true;
        };
    };

    html_remove_player_interface() {
        if(this.can_remove) {
            this.hp.html_remove_health();
            this.exp.html_remove_exp();
            this.skills.html_remove_skills();
            this.time.html_remove_time();
            this.upgrade_slots.html_remove_upgrade_slots();
            this.gold.html_remove_gold();
            this.kill.html_remove_kill();
            this.can_remove = false;
        };
    };

    html_update_player_interface(player, ts, equipped_upgrades, report){
        this.hp.html_update_health(player.sheet.get_specific_health_fields());
        this.exp.html_update_exp(player.level);
        this.skills.html_update_skills(player.abilities.get_all())
        this.time.html_update_time(ts)
        this.upgrade_slots.html_update_upgrade_slots(equipped_upgrades);
        this.gold.html_update_gold(player.inventory.gold);
        this.kill.html_update_kill(report.get_kills());
    };
    
    html_build_upgrades_interface(upgrades){
        this.upgrades.html_build(upgrades);
        this.upgrades.html_update(upgrades);
    };

    html_close_upgrades_interface(){
        this.upgrades.html_decomission();
    };

    html_upgrades_interface_clicked(){
        return this.upgrades.clicked;
    };

    html_death_interface_clicked(){
        return this.death.clicked;
    };

    html_build_report(report, upgrades){
        this.death.html_build_death(report, upgrades);
    };

    html_build_menu_options(callback, player){
        this.menu_options.html_build_menu_options(
            {
                start_game: callback,
                build_shop: () => this.html_build_shop(player),
                build_settings: () => this.html_build_settings()
            }
        );
    };

    html_remove_menu_options(){
        this.shop.html_close();
        this.settings.html_close();
        this.menu_options.html_remove_menu_options();
    };

    html_build_shop(player){
        if (document.getElementById('shop-container')) {
            return;
        }
        this.settings.html_close();
        this.skills.html_build_skills(player.abilities.get_all());
        this.shop.html_build_shop(
            player, 
            {
                update_loadout: () => this.skills.html_update_skills(player.abilities.get_all())
            }
        );
    };

    html_build_settings(){
        if (document.getElementById('settings-container')) {
            return;
        }
        this.shop.html_close();
        this.settings.html_build();
    };
};
