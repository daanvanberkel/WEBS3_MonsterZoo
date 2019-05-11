export class Monster {
    imageIndex;
    type;
    name;
    arms;
    armType;
    legs;
    eyes;

    get typeName(){
        let type = this.type;
        if (type == null){
            type = 'water';
        }
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    get imgFile(){
        let imageIndex = this.imageIndex;
        if (imageIndex == null){
            imageIndex = Math.floor(Math.random() * 4) + 1;
        }
        return `${this.typeName}${imageIndex}.png`;
    }
}
