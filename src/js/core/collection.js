export class Collection {
    constructor({data = []} = {}) {
        this.collection = data;
    };

    // index(object){
    //     return this.list.indexOf(object);
    // }

    add(object) {
        this.collection.push(object);
    };

    remove(object) {
        const index = this.collection.indexOf(object);
        this.collection.splice(index, 1);
    };

    set(index, item){
        this.collection[index] = item;
    };

    get(index) {
        return this.collection[index];
    };

    includes(value){
        return this.collection.includes(value);
    }

    size() {
        return this.collection.length;
    };

    get_all() {
        return this.collection;
    };

    clear() {
        this.collection = [];
    };
};