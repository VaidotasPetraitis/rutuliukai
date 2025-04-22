export class Keybind{
    constructor(){
        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.abilities = [
            { key: false },
            { key: false },
            { key: false }
        ];
        this.interact = false;
    };

    is_player_interacting() {
        return this.interact;
    }

    is_player_moving(){
        return this.movement.up || this.movement.down || this.movement.left || this.movement.right;
    }
};