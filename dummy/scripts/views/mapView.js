export class MapView {

    /**
     * Bind to HTML element and ZooController
     * 
     * @param {ZooController} controller 
     */
    constructor(zooController) {
        this.element = document.querySelector('#zoo');
        this.controller = zooController;
    }

    /**
     * Render HTML layout from Zoo Model
     * 
     * @param {Models/Zoo} zoo
     */
    drawMap(zoo) {

        // clear grid
        this.element.innerHTML = "";

        // create grid
        const grid = document.createElement('div');
        grid.classList.add('grid');

        // loop trough rows in zoo grid
        for(let row of zoo.grid) {

            // create html row
            const htmlRow = document.createElement('div');
            htmlRow.classList.add('row');
            
            // loop trough tiles in the row
            for(let tile of row) {

                // create html of the tile
                let t = document.createElement('tile-component');
                t.tile = tile;

                t.addEventListener('click', e => {
                    this.controller.handleClick(tile);
                });

                htmlRow.appendChild(t);
            }

            grid.appendChild(htmlRow);
        }

        this.element.appendChild(grid);
    }

    addMonster(monster){

        // find free tile
        let tiles = Array.from(this.element.querySelectorAll("tile-component"));

        let freeTiles = tiles.filter(tile => tile.classList.contains('free-tile'));

        if (freeTiles.length > 0){
            let freeTile =  freeTiles[0]
            freeTile.tile.monster = monster;
            freeTile.render();
        }

    } 

    // TODO: Create monster render function
}