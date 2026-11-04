import { Arena } from "./scene/arena.js";
import { HashMap } from "../core/hashmap.js";
import { ENUMS_DATA } from "../core/fetch.js";
import { Menu } from "./scene/menu.js";
import { set_global_opacity } from "../core/render.js";

const SCENE_LIST = ENUMS_DATA.SceneList;

export class Scenes {   
    constructor(player, audio) {
        this.scenes = new HashMap({
            data: { 
                [SCENE_LIST.Arena]: new Arena(player, audio),
                [SCENE_LIST.Menu]: new Menu(player, audio)
        }});

        this.current = this.scenes.get(SCENE_LIST.Menu);
        this.current.setup(0);

        this.opacity = {
            current: 0,
            offset: 0.05
        };

        this.intervalId = null;
        this.transition = false;
    };

    update(timestamp) {
        const next_scene = this.scenes.keys().indexOf(this.current.type) == this.scenes.size() - 1 ? this.scenes.keys()[0] : this.scenes.keys()[this.scenes.size() - 1];
       
        if(this.current.is_scene_over() && !this.transition) {
            this.interval(
                () => decrease_opacity(this.opacity), 
                () => is_opacity_min(this.opacity), 
                () => {
                    this.change_Scene(next_scene, timestamp)
                    this.interval(
                        () => increase_opacity(this.opacity), 
                        () => is_opacity_max(this.opacity),
                        () => {this.transition = false;}
                    );
                }
            );
        };

        this.current.update(timestamp);
        set_global_opacity(this.opacity.current);
    };

    interval(operation, condition, callback) {
        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.transition = true;
                operation();
                if(condition()) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                    callback();
                };
            }, 16);
        };
    };

    change_Scene(scene_name, timestamp){
        this.current.dispose();
        this.current = this.scenes.get(scene_name);
        this.current.setup(timestamp);
    }
};

function decrease_opacity(opacity) {
    opacity.current += opacity.offset;
};

function increase_opacity(opacity) {
    opacity.current -= opacity.offset;
};

function is_opacity_min(opacity) {
    return opacity.current >= 1;
};

function is_opacity_max(opacity) {
    return opacity.current <= 0;
};