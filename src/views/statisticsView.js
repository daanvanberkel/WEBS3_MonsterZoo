export class StatisticsView {

    /**
     * Render HTML of monster statistics/properties
     * 
     * @param {Monster} monster
     */
    show(monster) {
        const statistics = document.querySelector('#statistics-content');
        const monster_details = document.querySelector('#monster-details');

        // Clear details
        monster_details.innerHTML = '';

        // Create monster statistics HTML
        let monsterImg = document.createElement('img');
        monsterImg.src = monster.imgFile;
        monsterImg.classList.add('monster-icon');

        monster_details.appendChild(monsterImg);

        let monsterName = document.createElement('div');
        monsterName.innerText = monster.name ? monster.name : 'UNKNOWN';

        monster_details.appendChild(monsterName);
        
        statistics.classList.add('show');
    }
}
