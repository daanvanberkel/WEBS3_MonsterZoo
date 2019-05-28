export class StatisticsView {

    constructor() {
        this.statistics = document.querySelector('#statistics-content');
        this.monster_details = document.querySelector('#monster-details');
    }

    hide() {
        this.statistics.classList.remove('show');

        // Wait for animation
        setTimeout(() => {
            this.monster_details.innerHTML = '';
        }, 500);
    }

    /**
     * Render HTML of monster statistics/properties
     * 
     * @param {Monster} monster
     */
    show(monster) {
        const monster_details = this.monster_details;

        // Clear details
        monster_details.innerHTML = '';

        // Create monster statistics HTML
        let monsterImg = document.createElement('img');
        monsterImg.src = monster.imgFile;
        monsterImg.classList.add('monster-icon');
        monster_details.appendChild(monsterImg);

        let monsterName = document.createElement('div');
        monsterName.innerText = monster.name ? monster.name : 'UNKNOWN';
        monsterName.classList.add('monster-name');
        monster_details.appendChild(monsterName);

        let color = monster.color;
        switch(color) {
            case 'blue': color = 'blauwe'; break;
            case 'red': color = 'rode'; break;
            case 'green': color = 'groene'; break;
            case 'orange': color = 'oranje'; break;
            case 'braun': color = 'bruine'; break;
            case 'purple': color = 'paarse'; break;
            case 'white': color = 'witte'; break;
        }

        let type = monster.type;
        switch(type) {
            case 'fire': type = 'vuur'; break;
            case 'earth': type = 'aarde'; break;
        }

        let armType = monster.armType;
        switch(armType) {
            case 'tentacle': armType = 'tentakels'; break;
            case 'fins': armType = 'vinnen'; break;
            case 'claws': armType = 'klauwen'; break;
            case 'claw-wings': armType = 'klauw vleugels'; break;
            case 'wings': armType = 'vleugels'; break;
        }

        let fur = monster.fur;
        switch(fur) {
            case 'scales': fur = 'schubben'; break;
            case 'slime': fur = 'slijm'; break;
            case 'feathers': fur = 'veren'; break;
            case 'hair': fur = 'haren'; break;
        }

        let description = document.createElement('div');
        description.classList.add('monster-details');
        description.innerHTML = `Dit <b>${color}</b> <b>${type}</b> monster kan <b>${monster.fly ? '' : 'niet'} vliegen</b>, 
            heeft <b>${monster.eyes} ogen</b>, 
            <b>${monster.legs} benen</b>, 
            <b>${monster.arms} ${armType}</b> 
            en heeft een <b>${fur} vacht</b>.`;
        monster_details.appendChild(description);
        
        this.statistics.classList.add('show');
    }
}
