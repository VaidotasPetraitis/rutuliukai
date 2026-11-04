import { radial_gradient, canvas_filled_rectangle } from "../core/render.js";
import { CANVAS_SIZE } from "../core/canvas.js";
import { FOG_DATA } from "../core/fetch.js";

export class Fog {
    constructor() {
        this.settings = FOG_DATA.settings;
        this.scaling = FOG_DATA.scaling;
        this.scaling_size_base = this.settings.size
    };

    set_background(player_hp) {
        const percent = (player_hp.value / player_hp.value_max).toFixed(2);

        const red = Math.round(this.scaling.red * Math.abs((percent - 1)));
        const alpha = this.scaling.alpha * Math.abs((percent - 1)).toFixed(1);
        const size =  this.scaling.size * Math.abs((percent - 1)) + this.scaling_size_base;

        this.settings.rgba.from[0] = red;
        this.settings.rgba.from[3] = alpha;
        this.settings.size = size;
    };

    draw(player) {
        const player_location = player.rect.location;

        const gradient = radial_gradient(player_location, this.settings);
        canvas_filled_rectangle({ x: 0, y: 0 }, { width: CANVAS_SIZE.Width, height: CANVAS_SIZE.Height }, { fill_style: gradient });
    };
};