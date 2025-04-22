import { CANVAS_SIZE } from "../../core/canvas.js";
import { Rectangle } from "../../core/rectangle.js"
import { Weapons } from "../weapon/weapons.js";
import { Sheet } from "../sheet/sheet.js";
import { Keybind } from "./keybind.js";
import { Inventory } from "./inventory.js";
import { Abilities } from "../abilities/abilities.js";
import { Level } from "./level.js";
import { Trail } from "../../core/trail.js";
import { ENUMS_DATA, PLAYER_DATA } from "../../core/fetch.js";

const MODIFIER = ENUMS_DATA.Modifier;

export class Player{
    constructor(){
        this.rect = new Rectangle({
            x: CANVAS_SIZE.Width / 2,
            y: CANVAS_SIZE.Height / 2,
            w: PLAYER_DATA.dimension.width,
            h: PLAYER_DATA.dimension.height
        });

        const sheet_data = PLAYER_DATA.sheet_data;
        this.sheet = new Sheet({...sheet_data});
        
        this.keybind = new Keybind();
        this.inventory = new Inventory();
        this.abilities = new Abilities();

        this.trail = new Trail({
            len: PLAYER_DATA.trail.len,
            code: PLAYER_DATA.color.trail,
            from: PLAYER_DATA.trail.from,
            to: PLAYER_DATA.trail.to,
            width: this.rect.dimension.width
        });

        this.weapons = new Weapons(this.sheet);
        this.level = new Level();
    };

    clear() {
        const sheet_data = PLAYER_DATA.sheet_data;
        this.sheet = new Sheet({...sheet_data});
        this.level.clear();
        this.weapons.clear(this.sheet);
        this.rect.location.x = CANVAS_SIZE.Width / 2;
        this.rect.location.y = CANVAS_SIZE.Height / 2;
        this.trail.clear();
    };
    
    movement() {
        const speed = this.sheet.get_modifier_value(MODIFIER.MovementSpeed);

        if (this.keybind.movement.up) this.rect.location.y -= speed;
        if (this.keybind.movement.down) this.rect.location.y += speed;
        if (this.keybind.movement.left) this.rect.location.x -= speed;
        if (this.keybind.movement.right) this.rect.location.x += speed;

        this.trail.previous_positions(
            this.rect.location.x + this.rect.dimension.width / 2,
            this.rect.location.y + this.rect.dimension.height / 2
        );
    };

    movement_menu(){
        const speed = this.sheet.get_modifier_value(MODIFIER.MovementSpeed);
        
        this.rect.location.x -= speed;
        if(this.rect.location.x <= 0) {
            this.rect.location.x =  CANVAS_SIZE.Width;
        };

        this.trail.previous_positions(
            this.rect.location.x + this.rect.dimension.width / 2,
            this.rect.location.y + this.rect.dimension.height / 2
        );
    };

    is_dead(){
        return this.sheet.get_modifier_value(MODIFIER.Hp) <= 0;
    };

    take_damage(value) {
        this.sheet.set_specific_modifier_value(MODIFIER.Hp, -value);
    };

    draw() {
        this.rect.draw({fill_style: PLAYER_DATA.color.body, filled: true, circle: true});
        this.trail.draw();
    };

    get_level() {
        return this.level.current;
    };

    set_ability(index, item) {
        this.abilities.set_item(index, item);
    };
};