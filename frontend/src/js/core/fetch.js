async function fetchData(api) {
    const response = await fetch(`http://localhost:8000/api/${api}`);
    return await response.json();
}

const player_data_promise = fetchData("actor/player");
const enemies_bulk_spawn_data_promise = fetchData("spawn/bulk");
const enemies_consistent_spawn_data_promise = fetchData("spawn/stream");
const enemies_data_promise = fetchData("actor/enemies");
const keybind_movement_data_promise = fetchData("keybind/movement");
const keybind_abilities_data_promise = fetchData("keybind/ability");
const abilities_data_promise = fetchData("ability");
const fog_data_promise = fetchData("fog");
const report_data_promise = fetchData("report");
const weapons_data_promise = fetchData("actor/weapons");
const enums_data_promise = fetchData("enums");
const upgrade_data_promise = fetchData("upgrade");
const html_player_promise = fetchData("html/player");
const html_skill_promise = fetchData("html/skill");
const upgrade_tier_html_db_promise = fetchData("html/db/upgrade");
const exp_settings_promise = fetchData("level/settings");
const exp_gain_promise = fetchData("level/gain");
const exp_multi_promise = fetchData("level/multi");
const shop_shelf_promise = fetchData("ability/db/shop");
const upgrade_basic_db_promise = fetchData("upgrade/db/basic");
const upgrade_legendary_db_promise = fetchData("upgrade/db/legendary");
const upgrade_weapon_db_promise = fetchData("upgrade/db/weapon");
const upgrade_tier_db_promise = fetchData("upgrade/db/tier");
const highscore_db_promise = fetchData("highscore/get");

export const PLAYER_DATA = await player_data_promise;
export const ENEMIES_DATA = await enemies_data_promise;
export const ENEMIES_BULK_SPAWN_DATA = await enemies_bulk_spawn_data_promise;
export const ENEMIES_CONSISTENT_SPAWN_DATA = await enemies_consistent_spawn_data_promise;
export const KEYBIND_MOVEMENT_DATA = await keybind_movement_data_promise;
export const KEYBIND_ABILITIES_DATA = await keybind_abilities_data_promise;
export const ABILITIES_DATA = await abilities_data_promise;
export const FOG_DATA = await fog_data_promise;
export const REPORT_DATA = await report_data_promise;
export const WEAPONS_DATA = await weapons_data_promise;
export const ENUMS_DATA = await enums_data_promise;
export const UPGRADE_DATA = await upgrade_data_promise;
export const HTML_PLAYER_DATA = await html_player_promise;
export const HTML_SKILL_DATA = await html_skill_promise;
export const EXP_SETTINGS_DATA = await exp_settings_promise;
export const EXP_GAIN_DATA = await exp_gain_promise;
export const EXP_MULTI_DATA = await exp_multi_promise;
export const SHOP_SHELF_DATA = await shop_shelf_promise;
export const UPGRADE_BASIC_DB_DATA = await upgrade_basic_db_promise;
export const UPGRADE_LEGENDARY_DB_DATA = await upgrade_legendary_db_promise;
export const UPGRADE_WEAPON_DB_DATA = await upgrade_weapon_db_promise;
export const UPGRADE_TIER_DB_DATA = await upgrade_tier_db_promise;
export const UPGRADE_TIER_HTML_DB_DATA = await upgrade_tier_html_db_promise;
export const HIGHSCORE_DB_DATA = await highscore_db_promise;

export async function fetch_get(api) {
    const response = await fetch(`http://localhost:8000/api/${api}`);
    const result = await response.json();
    return await result;
};

export async function fetch_post(body, api) {
    const url = `http://localhost:8000/api/${api}`;
    
    const data = {
        method: 'POST',                                  // method POST = sending data
        headers: { 'Content-Type': 'application/json' }, // content type = json

        body: JSON.stringify(body)
    };

    await fetch(url, data);
};