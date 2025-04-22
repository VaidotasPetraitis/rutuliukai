import { random_int_in_range } from "../../core/rng.js";
import { Teleport } from "../abilities/skill/teleport.js";
import { Ray } from "../weapon/ray.js";
import { ENUMS_DATA } from "../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;
const MONSTER_PATTERN = ENUMS_DATA.MonsterPattern;

export class MonsterStrategy {
    constructor({movement_pattern, shoot = false, teleport = false, sheet} = {}) {
        this.movement_pattern = movement_pattern;
        this.can_shoot = shoot;
        this.can_teleport = teleport;

        this.weapon = new Ray(sheet);
        this.teleport = new Teleport(4000, 50);
    }

    execute(player, monster_location, monster_sheet){
        movement(this.movement_pattern, player.rect.location, monster_location, monster_sheet);
        if(this.can_shoot) this.weapon.shoot(player, monster_location);
        if(this.can_teleport) teleport_use(this.teleport, monster_location);
    }
}

function movement(pattern, p_loc, m_loc, m_sheet) {
    switch (pattern) {
        case MONSTER_PATTERN.Line:
        movement_line(p_loc, m_loc, m_sheet);
        break;
        case MONSTER_PATTERN.None:
        break;
        case MONSTER_PATTERN.Jiggly:
        movement_random(p_loc, m_loc, m_sheet);
        break;
    };
};

function movement_line(p_loc, m_loc, m_sheet) {
    m_loc.set_unit_vector(p_loc);
    const speed = m_sheet.get_modifier_value(MODIFIER.MovementSpeed);
    m_loc.x += (m_loc.vector.nx * speed);
    m_loc.y += (m_loc.vector.ny * speed);
};

function movement_random(p_loc, m_loc, m_sheet) {
    m_loc.set_unit_vector(p_loc);
    const speed = m_sheet.get_modifier_value(MODIFIER.MovementSpeed);
    m_loc.x += (m_loc.vector.nx * speed) + random_int_in_range(-2, 3);
    m_loc.y += (m_loc.vector.ny * speed) + random_int_in_range(-2, 3);
};

function teleport_use(teleport, monster_location) {
    if(teleport.monster_condition()){
        teleport.cooldown.set_is_ready();
        teleport.monster_operation(monster_location);
        teleport.cooldown.start();
    };
};

