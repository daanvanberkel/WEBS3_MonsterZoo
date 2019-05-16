export class TileComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.classList.add('tile');

        if (this.tile.isBorderTile) {
            this.classList.add('empty-tile');
        }

        if (this.tile.isObstacle) {
            let randomImageId = Math.floor(Math.random() * 3) + 1;
            this.classList.add(`obstacle-${randomImageId}`);
        }
    }
}