export class Map {
    constructor(data) {
        this.name = data ? data.name : '';
        this.climate = data ? data.climate : '';
        this.city = data ? data.city : '';
        this.grid = data ? data.grid : [];
    }
}
