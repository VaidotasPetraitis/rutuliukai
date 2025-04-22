export class SparseGrid {
        constructor() {
        this.cell_size = 20;
        this.grid = new Map();
    };
    
    set_cell_contents(m) {
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
        let nearby_grids = [];

        for (let i = -n; i <= n; i++) {
            for (let j = -n; j <= n; j++) {
                const new_key = `${x + i},${y + j}`;
                if (this.grid.has(new_key)) {
                    nearby_grids.push(this.grid.get(new_key));
                };
            };
        };
        
        const result = nearby_grids.flat();
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
    };
};

