async function loadData(file) {
    const url = new URL(`../../../data/${file}.json`, import.meta.url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not load ${file}: HTTP ${response.status}`);
    }
    return response.json();
}

const [actors, spawning, controls, progression, ui, game, catalog] = await Promise.all([
    loadData("actors"),
    loadData("spawning"),
    loadData("controls"),
    loadData("progression"),
    loadData("interface"),
    loadData("game"),
    loadData("catalog"),
]);

export const PLAYER_DATA = actors.player;
export const ENEMIES_DATA = actors.enemies;
export const ENEMIES_BULK_SPAWN_DATA = spawning.bulk;
export const ENEMIES_CONSISTENT_SPAWN_DATA = spawning.stream;
export const KEYBIND_MOVEMENT_DATA = controls.movement;
export const KEYBIND_ABILITIES_DATA = controls.abilities;
export const ABILITIES_DATA = game.ability;
export const FOG_DATA = game.fog;
export const REPORT_DATA = game.report;
export const WEAPONS_DATA = actors.weapons;
export const ENUMS_DATA = game.enums;
export const UPGRADE_DATA = progression.upgrades;
export const HTML_PLAYER_DATA = ui.player;
export const HTML_SKILL_DATA = ui.skill;
export const EXP_SETTINGS_DATA = progression.settings;
export const EXP_GAIN_DATA = progression.gain;
export const EXP_MULTI_DATA = progression.multiplier;
export const SHOP_CATALOG = catalog["ability/db/shop"];
export const UPGRADE_BASIC_DB_DATA = catalog["upgrade/db/basic"];
export const UPGRADE_LEGENDARY_DB_DATA = catalog["upgrade/db/legendary"];
export const UPGRADE_WEAPON_DB_DATA = catalog["upgrade/db/weapon"];
export const UPGRADE_TIER_DB_DATA = catalog["upgrade/db/tier"];
export const UPGRADE_TIER_HTML_DB_DATA = catalog["html/db/upgrade"];
