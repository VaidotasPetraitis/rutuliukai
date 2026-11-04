import { Collection } from "../../core/collection.js";
import { HashMap } from "../../core/hashmap.js";
import { Card } from "./card.js";
import { random_binary, random_int_in_range } from "../../core/rng.js";
import { UPGRADE_DATA, UPGRADE_BASIC_DB_DATA, UPGRADE_LEGENDARY_DB_DATA, UPGRADE_WEAPON_DB_DATA, UPGRADE_TIER_DB_DATA } from "../../core/fetch.js";

export class Upgrades {
    constructor(){
        this.rarity = UPGRADE_DATA.rarity;
        this.settings = UPGRADE_DATA.settings;

        this.db_upgrades_standard = new Collection();
        for (let i = 0; i < UPGRADE_BASIC_DB_DATA.length; i++) {
            this.db_upgrades_standard.add(new Card(UPGRADE_BASIC_DB_DATA[i]));
        };
        
        this.db_upgrades_legendary = new Collection();
        for (let i = 0; i < UPGRADE_LEGENDARY_DB_DATA.length; i++) {
            this.db_upgrades_legendary.add(new Card(UPGRADE_LEGENDARY_DB_DATA[i]));
        };

        this.db_upgrades_weapons = new Collection();
        for (let i = 0; i < UPGRADE_WEAPON_DB_DATA.length; i++) {
            this.db_upgrades_weapons.add(new Card(UPGRADE_WEAPON_DB_DATA[i]));
        };

        this.db_upgrades_tiers = new HashMap({data: UPGRADE_TIER_DB_DATA});
        this.upgrades_pool = new Collection();
        this.upgrades_equipped = new Collection();
        this.upgrades_choice = new Collection();
    };

    set_choices(equipped_weapons) {
        if(this.upgrades_choice.size() == 0) {
            add_option(
                this.rarity.unique.chance, 
                () => add_from_upgrades_weapons({
                    equipped_weapons: equipped_weapons,
                    db_weapons: this.db_upgrades_weapons,
                    db_tiers: this.db_upgrades_tiers,
                    choices: this.upgrades_choice, 
                    equipped_upgrades: this.upgrades_equipped.size(),
                    settings: this.settings
                })
            );

            add_option(
                this.rarity.legendary.chance, 
                () => add_from_upgrades_legendary({
                    equipped_weapons: equipped_weapons, 
                    db_legendary: this.db_upgrades_legendary, 
                    db_tiers: this.db_upgrades_tiers,
                    choices: this.upgrades_choice, 
                    equipped_upgrades: this.upgrades_equipped.size(),
                    settings: this.settings
                })
            );

            const count_equipped_valid_size = get_valid_equipped_upgrades(this.upgrades_equipped);
            const count_choice_size = get_upgrades_choice_count({
                valid: count_equipped_valid_size, 
                pool: this.upgrades_pool.size(), 
                choices: this.upgrades_choice.size(), 
                equipped_upgrades: this.upgrades_equipped.size(),
                settings: this.settings
            });

            while (this.upgrades_choice.size() != count_choice_size) {
                add_option(
                    this.settings.upgrades_from_equipped, 
                    () => add_from_upgrades_equipped({
                        valid: count_equipped_valid_size,
                        equipped_upgrades: this.upgrades_equipped,
                        choices: this.upgrades_choice, 
                        settings: this.settings
                    })
                );
                
                add_option(
                    this.settings.upgrades_from_pool, 
                    () => add_from_upgrades_pool({
                        pool: this.upgrades_pool, 
                        choices: this.upgrades_choice, 
                        db_tiers: this.db_upgrades_tiers, 
                        rarity: this.rarity,
                        equipped_upgrades: this.upgrades_equipped,
                        settings: this.settings
                    })
                );
            };
        };
    };

    clear_choices() {
        this.upgrades_choice.clear();
    };

    set_pool_from_db(type) {
        const filtered_db = this.db_upgrades_standard.get_all().filter(x => x.type == type);
        if(filtered_db.length > 0) {
            for (let i = 0; i < filtered_db.length; i++) {
                this.upgrades_pool.add(filtered_db[i]);
            };
        };
    };

    get_choices_size(){
        return this.upgrades_choice.size();
    };

    get_upgrades_equipped(){
        return this.upgrades_equipped;
    };

    random_item_from_weapons_db(){
        const random = random_int_in_range(0, this.db_upgrades_weapons.size());
        const upgrade = this.db_upgrades_weapons.get(random);
        const upgrade_with_tier = associate_tier_id(upgrade, this.db_upgrades_tiers);
        return upgrade_with_tier;
    };

    get_item_from_weapons_db(weapon){
        for (let i = 0; i < this.db_upgrades_weapons.size(); i++) {
            const item = this.db_upgrades_weapons.get(i);
            if(item.weapon == weapon){
                return item;
            };
        };
    };

    get_choice(i){
        return this.upgrades_choice.get(i);
    };

    add_equipped(upgrade){
        this.upgrades_equipped.add(upgrade);
    };

    remove_pool(upgrade){
        this.upgrades_pool.remove(upgrade);
    };

    remove_db_legendary(upgrade) {
        this.db_upgrades_legendary.remove(upgrade);
    };

    clear() {
        this.upgrades_equipped.clear();
        this.upgrades_pool.clear();
        this.upgrades_choice.clear;

        this.db_upgrades_standard.clear();
        for (let i = 0; i < UPGRADE_BASIC_DB_DATA.length; i++) {
            this.db_upgrades_standard.add(new Card(UPGRADE_BASIC_DB_DATA[i]));
        };
        
        this.db_upgrades_legendary.clear();
        for (let i = 0; i < UPGRADE_LEGENDARY_DB_DATA.length; i++) {
            this.db_upgrades_legendary.add(new Card(UPGRADE_LEGENDARY_DB_DATA[i]));
        };

        this.db_upgrades_weapons.clear();
        for (let i = 0; i < UPGRADE_WEAPON_DB_DATA.length; i++) {
            this.db_upgrades_weapons.add(new Card(UPGRADE_WEAPON_DB_DATA[i]));
        };
    };
}; 

function add_option(chance, callback) {
    const random = random_binary(chance);
    if (random) {
        callback();
    };
};

function add_from_upgrades_legendary({equipped_weapons, db_legendary, db_tiers, choices, equipped_upgrades, settings}) {
    if(equipped_upgrades < settings.upgrades_slots_max) { 
        const available_legendary_upgrades = db_legendary.get_all().filter(i => equipped_weapons.get_all().some(j => i.type == j.type));
        if (available_legendary_upgrades.length > 0) {
            const random = random_int_in_range(0, available_legendary_upgrades.length);
            const upgrade = available_legendary_upgrades[random];

            const upgreade_with_rarity = associate_tier_id(upgrade, db_tiers);
            if(upgreade_with_rarity != null) {
                upgrade.unselect();
                upgrade.source = 'db_legendary';
                choices.add(upgrade);
            };
        };
    }
};

function add_from_upgrades_weapons({equipped_weapons, db_weapons, db_tiers, choices, equipped_upgrades, settings}) {
    if(equipped_upgrades < settings.upgrades_slots_max) {
        const available_new_weapons = db_weapons.get_all().filter(i => !equipped_weapons.get_all().some(j => i.weapon == j.type));
        if (available_new_weapons.length > 0) {
            const random = random_int_in_range(0, available_new_weapons.length);
            const upgrade = available_new_weapons[random];

            const upgreade_with_rarity = associate_tier_id(upgrade, db_tiers);
            if(upgreade_with_rarity != null && upgrade.is_upgradable()) {
                upgrade.unselect();
                choices.add(upgrade);
            };
        };
    }
};

function add_from_upgrades_equipped({valid, equipped_upgrades, choices, settings}) {
    if(valid > 0) {
        const random = random_int_in_range(0, equipped_upgrades.size());
        const upgrade = equipped_upgrades.get(random);
        if(!choices.includes(upgrade) && upgrade.is_upgradable() && choices.size() + 1 <= settings.upgrades_choices_max) {
            upgrade.unselect();
            choices.add(upgrade);
        };
    };
};

function add_from_upgrades_pool({pool, choices, db_tiers, rarity, equipped_upgrades, settings}) {
    if(pool.size() > 0 && equipped_upgrades.size() < settings.upgrades_slots_max) {
        const random = random_int_in_range(0, pool.size());
        let upgrade = pool.get(random);
        if (!choices.includes(upgrade) && upgrade.is_upgradable() && choices.size() + 1 <= settings.upgrades_choices_max) {
            const upgreade_with_rarity = associate_tier_random(upgrade, db_tiers, rarity);
            if(upgreade_with_rarity != null) {
                upgrade.unselect();
                upgrade.source = 'pool';
                choices.add(upgrade);
            };
        };
    };
};

function associate_tier_id(upgrade, db_tiers){
    const tier = db_tiers.get(upgrade.id)[0];
    return upgrade.associate_tier(tier);
};

function associate_tier_random(upgrade, db_tiers, rarity){
    const random = Math.random();
    const upgrade_tiers = db_tiers.get(upgrade.id);
    for (let i = 0; i < upgrade_tiers.length; i++) {
        const tier = upgrade_tiers[i];
        if(random < rarity[tier.rarity].chance) {
            return upgrade.associate_tier(tier);
        };
    };

    return null;
};

function get_valid_equipped_upgrades(upgrades_equipped) {
    let count = 0;
    for (let i = 0; i < upgrades_equipped.size(); i++) {
        const upgrade = upgrades_equipped.get(i);
        if (upgrade.is_upgradable()) {
            count++;
        };
    };
    return count;
};

function get_upgrades_choice_count({valid, pool, choices, equipped_upgrades, settings}){
    let total;
    if(equipped_upgrades == settings.upgrades_slots_max) {
        total = valid + choices;
    } else if (equipped_upgrades < settings.upgrades_slots_max) {
        total = valid + pool + choices; 
    };

    if(total < settings.upgrades_choices_max && total > 0) {
        return total;
    } else if (total == 0) {
        return 0;
    };

    return settings.upgrades_choices_max;
};