export class Timer {
    constructor() {
        this.start_ts = 0;
        this.paused_ts = 0;
        this.running_ts;
        this.current_time = {
            m: 0,
            s: 0
        }; 
    }

    get_running_ts(_ts) {
        this.running_ts = _ts - this.paused_ts;
        const d = new Date(this.running_ts - this.start_ts);
        const m = ("0" + d.getMinutes()).slice(-2);
        const s = ("0" + d.getSeconds()).slice(-2);
        this.current_time = {
            m: m, 
            s: s
        };
    };

    get_paused_ts(_ts) {
        this.paused_ts = _ts - this.running_ts;
    };

    reset_paused_ts(_ts) {
        this.paused_ts = 0;
    };

    set_start_ts(_ts){
        this.start_ts = _ts;
    };

    get_ts() {
        return this.current_time;
    };

    clear() {
        this.start_ts = 0;
        this.paused_ts = 0;
        this.running_ts = null;
        this.current_time = {
            m: 0,
            s: 0
        };
    };
};