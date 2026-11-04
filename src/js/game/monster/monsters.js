import { Collection } from "../../core/collection.js"
import { Archer } from "./archer.js";
import { Jumper } from "./jumper.js";
import { Swarm } from "./swarm.js";
import { random_int_in_range } from "../../core/rng.js";
import { ENUMS_DATA, ENEMIES_BULK_SPAWN_DATA, ENEMIES_CONSISTENT_SPAWN_DATA } from "../../core/fetch.js";

const MONSTER_TYPE = ENUMS_DATA.MonsterType;

export class Monsters {
    constructor() {
        this.monsters = new Collection();
        this.prev_ts_m = "00";
        this.generated = false;
        this.intervals = {
            interval_swarm: null,
            interval_jumper: null,
            interval_archer: null
        };

        this.spawn = {
            consistent: ENEMIES_CONSISTENT_SPAWN_DATA,
            bulk: ENEMIES_BULK_SPAWN_DATA
        };
    };

    generate_menu(player_loc, camera_offset) {
        if(!this.generated) {
            for (let i = 0; i < 10; i++) {
                this.monsters.add(new Swarm(0, location_in_camera(player_loc, camera_offset)));
            };
            for (let i = 0; i < 10; i++) {
                this.monsters.add(new Jumper(0, location_in_camera(player_loc, camera_offset)));
            };
            for (let i = 0; i < 2300; i++) {
                this.monsters.add(new Archer(0, location_in_camera(player_loc, camera_offset)));
            };
            this.generated = true;
        };
    };

    generate_jumper_menu(player_lv, player_loc, camera_loc){
        this.generate_bulk(player_lv, player_loc, camera_loc, this.spawn.bulk[MONSTER_TYPE.Jumper].number, this.spawn.bulk[MONSTER_TYPE.Jumper].chance, MONSTER_TYPE.Jumper);
    }

    generate_monsters(frame, ts, paused, player_lv, player_loc, camera_loc) {
        this.generate_bulk(player_lv, player_loc, camera_loc, this.spawn.bulk[MONSTER_TYPE.Swarm].number, this.spawn.bulk[MONSTER_TYPE.Swarm].chance, MONSTER_TYPE.Swarm);
        this.generate_bulk(player_lv, player_loc, camera_loc, this.spawn.bulk[MONSTER_TYPE.Archer].number, this.spawn.bulk[MONSTER_TYPE.Archer].chance, MONSTER_TYPE.Archer);
        this.generate_bulk(player_lv, player_loc, camera_loc, this.spawn.bulk[MONSTER_TYPE.Jumper].number, this.spawn.bulk[MONSTER_TYPE.Jumper].chance, MONSTER_TYPE.Jumper);
        this.generate_monster(frame, ts, paused, player_lv, player_loc, camera_loc, MONSTER_TYPE.Swarm);
        this.generate_monster(frame, ts, paused, player_lv, player_loc, camera_loc, MONSTER_TYPE.Archer);
        this.generate_monster(frame, ts, paused, player_lv, player_loc, camera_loc, MONSTER_TYPE.Jumper);
        this.prev_ts_m = ts.m;
    };

    generate_monster(frame, ts, paused, player_lv, player_loc, camera_loc, type) {
        // tooLowerCase() for consistency as I use something_something case, I dot want something_Something ofr intervals....
        const type_lower = type.toLowerCase();
        let interval = this.intervals[`interval_${type_lower}`];

        if (frame !== 0 && (this.prev_ts_m !== ts.m || paused)) {
             this.clear_interval(type_lower);
        };
        
        if (frame !== 0 && !interval && !paused) {
            const rate = this.spawn.consistent[type][ts.m].freq;
            if(rate != null){
                this.intervals[`interval_${type_lower}`] = setInterval(() => {
                    this.generate_bulk(player_lv, player_loc, camera_loc, this.spawn.consistent[type][ts.m].bulk, 1, type);
                }, this.spawn.consistent[type][ts.m].freq);
            };
        };
    };

    generate_bulk(player_lv, player_loc, camera_loc, bulk_number, bulk_chance, type) {
        const chance = Math.random();
        if(chance <= bulk_chance) {
            let loc = location(player_loc, camera_loc);
            for (let i = 0; i < bulk_number; i++) {
                loc.x += random_int_in_range(-1, 1);
                loc.y += random_int_in_range(-1, 1);
                const m = inti_monster(type, player_lv, loc);
                this.monsters.add(m);
            };
        };
    };

    clear_interval(type) {
        clearInterval(this.intervals[`interval_${type}`]);
        this.intervals[`interval_${type}`] = null;
    }

    draw() {
        for (let i = 0; i < this.monsters.size(); i++) {
            const m = this.monsters.get(i);
            m.draw({});
        };
    };

    update(player) {
        for (let i = 0; i < this.monsters.size(); i++) {
            const m = this.monsters.get(i);
            m.update(player);
        };
    };

    movement_menu(swarm_movement, jumper_movement) {
        for (let i = 0; i < this.monsters.size(); i++) {
            const m = this.monsters.get(i);
            if(m.type == MONSTER_TYPE.Swarm) {
                m.movement_menu(swarm_movement);
            } else if(m.type == MONSTER_TYPE.Jumper){

                m.movement_menu(jumper_movement);
            };
        };
    };

    clear() {
        this.clear_interval(MONSTER_TYPE.Swarm.toLowerCase());
        this.clear_interval(MONSTER_TYPE.Archer.toLowerCase());
        this.clear_interval(MONSTER_TYPE.Jumper.toLowerCase());
        this.monsters.clear();
    };

    remove_on_death(player, report) {
        for (let i = 0; i < this.monsters.size(); i++) {
            const m = this.monsters.get(i);
            if(m.is_dead()) {

                player.level.add_experience_on_kill(m.on_death.get_exp());
                player.inventory.add_gold_on_kill(m.on_death.get_gold());
                report.log_kill();
                report.log_gold(m.on_death.get_gold());
                this.monsters.remove(m);
            };
        };
    };

    get_all() {
        return this.monsters;    };
};

function inti_monster(type, player_lv, location) {
    switch (type) {
        case MONSTER_TYPE.Swarm:
            return new Swarm(player_lv, location);
        case MONSTER_TYPE.Archer:
            return new Archer(player_lv, location);
        case MONSTER_TYPE.Jumper:
            return new Jumper(player_lv, location);
    };
};

function location_in_camera(player_loc, camera_offset){
    const vw_x = player_loc.x + camera_offset.x;
    const vw_y = player_loc.y + camera_offset.y;
    
    const x = random_int_in_range(vw_x, Math.abs(camera_offset.x * 2)  + vw_x);
    const y = random_int_in_range(vw_y, Math.abs(camera_offset.y * 2)  + vw_y);

    return {x,y};
};

function location(player_loc, camera_offset) {
    const vw_x = player_loc.x + camera_offset.x;
    const vw_y = player_loc.y + camera_offset.y;
    
    const direction = Math.floor(Math.random() * 4);
    
    let x;
    let y;
    
    switch (direction) {
        case 0: // left
            x = vw_x;
            y = (Math.abs(camera_offset.y * 2) * Math.random()) + vw_y;
            break;
        case 1: // top
            x = (Math.abs(camera_offset.x * 2) * Math.random()) + vw_x;
            y = vw_y;
            break
        case 2: // right
            x = vw_x + Math.abs(camera_offset.x * 2);
            y = (Math.abs(camera_offset.y * 2) * Math.random()) + vw_y;
            break
        case 3: // down
            x = (Math.abs(camera_offset.x * 2) * Math.random()) + vw_x;
            y = vw_y + Math.abs(camera_offset.y * 2); 
            break
        };
    return {x, y};
};