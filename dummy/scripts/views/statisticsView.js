export class StatisticsView {

    /**
     * Render HTML of monster statistics/properties
     * 
     * @param {Tile} tile 
     */
    show(tile) {
        
        const statistics = document.querySelector('#statistics-content');
        const monster_details = document.querySelector('#monster-details');

        if (!tile.monster) {
            monster_details.innerHTML = `<p>Er zit (nog) geen monster in dat verblijf.</p>`;
        } else {
            monster_details.innerHTML = `<p>Je klikt op monster ${tile.monster}!</p>`;
        }
        
        statistics.classList.add('show');
    }
}
