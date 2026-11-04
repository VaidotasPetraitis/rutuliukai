import { Scenes } from "./game/scenes.js";
import { Player } from "./game/player/player.js";
import { Events } from "./core/events.js";
import { canvas_clear, canvas_save, canvas_restore } from "./core/render.js";

export class Application {
    constructor() {
        this.player = new Player();
        this.events = new Events();
        this.scenes = new Scenes(this.player);
        this.events.handle_player_movement_listeners(this.player);
    };

    animate(timestamp) {
        canvas_save();
        canvas_clear();
        this.scenes.update(timestamp);
        canvas_restore();
        requestAnimationFrame(this.animate.bind(this));
    };
};

