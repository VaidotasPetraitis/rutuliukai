import { Dimension } from "../../core/dimension.js";
import { Monsters } from "../monster/monsters.js";
import { Hud } from "../hud/hud.js";
import { CANVAS_SIZE } from "../../core/canvas.js";
import { Camera } from "../camera.js";
import { Report } from "../report.js";
import { Combat } from "../combat.js";
import { Frame } from "./frame.js";
import { ENUMS_DATA } from "../../core/fetch.js";
import { AudioManager, AUDIO_PRELOADED, AUDIO_TYPE } from "../../core/audio.js";

const SCENE_LIST = ENUMS_DATA.SceneList;
const TOWN_AUDIO = AUDIO_PRELOADED[AUDIO_TYPE.Town];

export class Menu {
    constructor(player) {
        this.type = SCENE_LIST.Menu;
        this.dimension = new Dimension({w: CANVAS_SIZE.Width, h: CANVAS_SIZE.Height});
        this.player = player;
        this.frame = new Frame();
        this.monsters = new Monsters();
        this.report = new Report();
        this.hud = new Hud();
        this.camera = new Camera();
        this.combat = new Combat(this.player, this.monsters, this.report);
        this.scene_over = false;
        this.start_sound = null;

        this.monsters.generate_menu(
            this.player.rect.location,
            this.camera.scale.offset
        );
    };

    update() {
        this.camera.draw();
        this.monsters.draw(this.camera);
        this.monsters.movement_menu(5, 5);
        this.combat.update(this.report);
        this.frame.incrament();
    };

    is_scene_over() {
        return this.scene_over;
    };

    async setup() {
        AudioManager.playAudio(TOWN_AUDIO.background, true);
        this.hud.html_build_menu_options(() => this.set_scene_over(), this.player);
    };

    dispose() {
        AudioManager.stopAllAudio(this.start_sound);
        this.start_sound = null;
        this.hud.html_remove_menu_options();
        this.scene_over = false;
    };

    set_scene_over() {
        if (this.scene_over) {
            return;
        }
        this.start_sound = AudioManager.playAudio(TOWN_AUDIO.shop_open);
        this.scene_over = true;
    };
};
