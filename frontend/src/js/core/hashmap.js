export class HashMap {
    constructor({data = {}} = {}) {
        this.hashmap = data;
    };

    put(key, value) {
        this.hashmap[key] = value;
    };

    get(key) {
        return this.hashmap[key];
    };

    get_all() {
        return this.hashmap;
    }

    contains_key(key) {
        return this.hashmap.hasOwnProperty(key);
    };

    remove(key) {
        delete this.hashmap[key];
    };

    keys() {
        return Object.keys(this.hashmap);
    };

    values() {
        return Object.values(this.hashmap);
    };

    size() {
        return Object.keys(this.hashmap).length;
    };

    clear() {
        this.hashmap = {};
    };
};