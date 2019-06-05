import Water1 from "../images/Monsters/Water/Water1.png";
import Water2 from "../images/Monsters/Water/Water2.png";
import Water3 from "../images/Monsters/Water/Water3.png";
import Water4 from "../images/Monsters/Water/Water4.png";
import Earth1 from "../images/Monsters/Earth/Earth1.png";
import Earth2 from "../images/Monsters/Earth/Earth2.png";
import Earth3 from "../images/Monsters/Earth/Earth3.png";
import Earth4 from "../images/Monsters/Earth/Earth4.png";
import Fire1 from "../images/Monsters/Fire/Fire1.png";
import Fire2 from "../images/Monsters/Fire/Fire2.png";
import Fire3 from "../images/Monsters/Fire/Fire3.png";
import Fire4 from "../images/Monsters/Fire/Fire4.png";
import Wind1 from "../images/Monsters/Wind/Wind1.png";
import Wind2 from "../images/Monsters/Wind/Wind2.png";
import Wind3 from "../images/Monsters/Wind/Wind3.png";
import Wind4 from "../images/Monsters/Wind/Wind4.png";

export class Monster {
    constructor(data) {
        this.imageIndex = data ? data.imageIndex : null;
        this.type = data ? data.type : null;
        this.name = data ? data.name : null;
        this.arms = data ? data.arms : null;
        this.armType = data ? data.armType : null;
        this.legs = data ? data.legs : null;
        this.eyes = data ? data.eyes : null;
        this.fur = data ? data.fur : null;
        this.fly = data ? data.fly : null;
        this.color = data ? data.color : null;

        this.attackStrength = Math.floor(Math.random() * 4);
        this.attackStrength += 3;
    }

    increaseStrength(amount) {
        if ((this.attackStrength + amount) > 10) {
            this.attackStrength = 10;
        } else {
            this.attackStrength += amount;
        }
    }

    decreaseStrength(amount) {
        if ((this.attackStrength - amount) < 0) {
            this.attackStrength = 0;
        } else {
            this.attackStrength -= amount;
        }
    }

    get strength() {
        return this.attackStrength;
    }

    get typeName(){
        let type = this.type;
        if (type == null){
            type = 'water';
        }
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    get attack() {
        switch(this.typeName.toLowerCase()) {
            case 'water': return 'Tsunami';
            case 'fire' : return 'Vuur spugen';
            case 'wind': return 'Wind spin move';
            case 'earth': return 'Aardbeving';
        }
    }

    get imgFile(){
        switch(`${this.typeName}${this.imageIndex}`) {
            case 'Water1':
                return Water1;

            case 'Water2':
                return Water2;

            case 'Water3':
                return Water3;

            case 'Water4':
                return Water4;

            case 'Earth1':
                return Earth1;

            case 'Earth2':
                return Earth2;

            case 'Earth3':
                return Earth3;

            case 'Earth4':
                return Earth4;

            case 'Fire1':
                return Fire1;

            case 'Fire2':
                return Fire2;

            case 'Fire3':
                return Fire3;

            case 'Fire4':
                return Fire4;

            case 'Wind1':
                return Wind1;

            case 'Wind2':
                return Wind2;

            case 'Wind3':
                return Wind3;

            case 'Wind4':
                return Wind4;
        }
        
        return '';
    }
}
