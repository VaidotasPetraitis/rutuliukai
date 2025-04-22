export class Cooldown {
    constructor(cooldown){
        this.time = {
            remaining: cooldown,
            max: cooldown
        };

        this.is_ready = false;
        this.interval = null;
    };

    start() {
        this.interval = setInterval(() => {

            this.time.remaining = Math.max(0, this.time.remaining - 100);
            if (this.time.remaining == 0) {
                clearInterval(this.interval);
                this.interval = null;
                this.set_is_ready();
                this.time.remaining = this.time.max;

            };
        }, 100);
    };

    set_is_ready() {
        this.is_ready = !this.is_ready;
    };
};