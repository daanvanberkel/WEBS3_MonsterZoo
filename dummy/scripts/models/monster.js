export class Monster {
    imageIndex;
    type;
    name;
    arms;
    armType;
    legs;
    eyes;
    fur;
    fly;
    color;

    get typeName(){
        let type = this.type;
        if (type == null){
            type = 'water';
        }
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    get imgFile(){
        return `${this.typeName}${this.imageIndex}.png`;
    }
}
