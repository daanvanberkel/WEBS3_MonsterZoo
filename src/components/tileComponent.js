import soundFile from "../sound/grass.mp3";

export class TileComponent extends HTMLElement {
    constructor(data) {
        super();

        this.posX = data ? data.posX : null;
        this.posY = data ? data.posY : null;
        this.tile = data ? data.tile : null;
    }
    
    connectedCallback() {
        this.render();

        this.addEventListener('click', e => {
            if (this.tile.monster) {
                let monsterClickEvent = new CustomEvent('monsterClicked', {
                    bubbles: true,
                    detail: this.tile.monster
                });

                this.dispatchEvent(monsterClickEvent);
            }
        });

        this.addEventListener("mousedown", e => {
            this.dispatchEvent(new CustomEvent('tileMouseDown', {
                bubbles: true,
                detail: e.target
            }));
        });
    }

    render() {
        this.classList.add('tile');

        if (this.tile.isBorderTile) {
            this.classList.add('empty-tile');
            return;
        }

        if (this.tile.isObstacle) {
            let randomImageId = Math.floor(Math.random() * 3) + 1;
            this.classList.add(`obstacle-${randomImageId}`);
            return;
        }

        if (this.tile.monster) {
            let monsterImg = document.createElement('img');
            monsterImg.src = this.tile.monster.imgFile;
            monsterImg.classList.add('monster');
            this.appendChild(monsterImg);
            this.classList.remove("free-tile");
        } else {
            if (this.querySelector('img')){
                this.querySelector('img').remove();
            }
            this.classList.add('free-tile');
        }
    }

    react(){

        var audio1 = new Audio(soundFile);
        var audio2 = new Audio(soundFile);

        var randomPauze = Math.random() * (500); 

        setTimeout(() => {

            if (this.tile.monster == null){
                return;
            }

            setTimeout(() => {
                audio1.play();

                setTimeout(() => {
                    audio2.play();
                }, 550);

            }, 200);

            this.classList.add('react');

            setTimeout(() => {
                this.classList.remove('react');
            }, 1000);
            
        }, randomPauze);

        
    }
}