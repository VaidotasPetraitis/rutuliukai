import { SparseGrid } from "../core/grid.js"
import { ENUMS_DATA } from "../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;

export class Combat {
    constructor(player, monsters, report) {
        this.player = player;
        this.monsters = monsters;
        this.report = report;
        this.grid = new SparseGrid();
    };

    update(){
        grid_insert_monsters(this.monsters, this.grid);
        monsters_avoidance(this.monsters, this.grid, this.player);
        monsters_attack(this.grid, this.player, this.report);
        player_attack(this.grid, this.player, this.report);
        this.grid.clear();
    };
};

function grid_insert_monsters(monsters_collection, grid) {
    const monsters = monsters_collection.get_all();
    for (let i = 0; i < monsters.size(); i++) {
        const m = monsters.get(i);
        grid.set_cell_contents(m);
    };
};

function monsters_avoidance(monsters_collection, grid, player) {
    const monsters = monsters_collection.get_all();
    for (let i = 0; i < monsters.size(); i++) {
        const m = monsters.get(i);
        const monsters_near_m = grid.nearby_grids(m, 1);
        m.rect.avoidance(monsters_near_m, player.keybind.is_player_moving());
    };
};

function monsters_attack(grid, player, report) {
    const monsters_near_player = grid.get_cell_contents(player);
    for (let i = 0; i < monsters_near_player.length; i++) {
        const m = monsters_near_player[i];
        if (player.rect.AABB(m.rect.location, m.rect.dimension)) {
            const m_dmage = m.sheet.get_modifier_value(MODIFIER.Damage);
            player.take_damage(m_dmage);
            report.log_damage_taken(m_dmage);
        };
    };
};

function player_attack(grid, player, report) {
    const weapons = player.weapons.get_all();
    for (let i = 0; i < weapons.size(); i++) {
        const weapon = weapons.get(i);
        const monsters_near_player = grid.nearby_grids(player, 4);
        weapon.shoot(player.rect.location, monsters_near_player);
        for (let j = 0; j < weapon.matrix.size(); j++) {
            const bullet = weapon.matrix.get(j);
            const monsters_near_bullet = grid.nearby_grids(bullet, 4);
            weapon.path(bullet, monsters_near_bullet, report, player.rect.location);
        };
    };
};