export class TileComponent extends HTMLElement {

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
            monsterImg.src = `/images/Monsters/${this.tile.monster.typeName}/${this.tile.monster.imgFile}`;
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
}