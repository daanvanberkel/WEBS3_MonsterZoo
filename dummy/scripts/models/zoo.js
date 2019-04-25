import { Cage } from "./cage.js";
import { EmptyTile } from "./emptyTile.js";

export class Zoo {
    name = '';
    climate = '';
    city = '';
    grid = [];

    loadGrid(jsonString) {
        let json = '';

        try {
            json = JSON.parse(jsonString);
        } catch (e) {
            console.log(`JSON error: ${e}`);
            return;
        }

        if (
            !json.name ||
            !json.climate ||
            !json['reference city']||
            !json.grid
        ) {
            console.log('JSON not valid');
            return;
        }

        this.name = json.name;
        this.climate = json.climate;
        this.city = json['reference city'];

        this.grid.push(this.createEmptyRow());

        for(let row of json.grid) {
            const r = [new EmptyTile()];

            // TODO: Check if monsters are saved in localstorage and place monsters in right cages
            for(let col of row.Columns) {
                const c = new Cage();
                
                if (col == 1) {
                    c.roomForMonster = false;
                }

                r.push(c);
            }

            r.push(new EmptyTile());

            this.grid.push(r);
        }

        this.grid.push(this.createEmptyRow());
    }

    createEmptyRow() {
        return [
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile(),
            new EmptyTile()
        ];
    }
}
