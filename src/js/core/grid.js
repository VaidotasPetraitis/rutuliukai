export class SparseGrid {
        constructor() {
        this.cell_size = 20;
        this.grid = new Map();
        this.nearby_cache = new Map();
    };
    
    set_cell_contents(m) {
        this.nearby_cache.clear();
        const x = Math.floor(m.rect.location.x / this.cell_size);
        const y = Math.floor(m.rect.location.y / this.cell_size);
        const key = `${x},${y}`;

        if (!this.grid.has(key)) {
            this.grid.set(key, []);
        }
        this.grid.get(key).push(m);
    }
    
    nearby_grids(obj, n) {
        const x = Math.floor(obj.rect.location.x / this.cell_size);
        const y = Math.floor(obj.rect.location.y / this.cell_size);
        const key = `${x},${y},${n}`;
        const cached = this.nearby_cache.get(key);
        if (cached) return cached;

        const result = [];

        for (let i = -n; i <= n; i++) {
            for (let j = -n; j <= n; j++) {
                const new_key = `${x + i},${y + j}`;
                const contents = this.grid.get(new_key);
                if (contents) {
                    for (let k = 0; k < contents.length; k++) {
                        result.push(contents[k]);
                    };
                };
            };
        };
        
        this.nearby_cache.set(key, result);
        return result;
    };

    get_cell_contents(m) {
        const x = Math.floor(m.rect.location.x / this.cell_size);
        const y = Math.floor(m.rect.location.y / this.cell_size);
        const key = `${x},${y}`;

        const cell_contents = this.grid.get(key) || [];
        return cell_contents;
    };

    clear() {
        this.grid.clear();
        this.nearby_cache.clear();
    };
};

