export class MonsterConfiguratorComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.renderMonster();
        this.renderFields();
    }

    renderMonster() {
        const image = document.createElement('img');
        image.classList.add('monster-icon');
        image.src = "/images/Forest/obstacle1.png";

        this.appendChild(image);
    }

    renderFields() {
        this.appendChild(this.createLabel("Type:"));
        this.appendChild(this.createTypeField());
    }

    createLabel(name) {
        const label = document.createElement('label');
        label.innerHTML = name;

        return label;
    }

    createTypeField() {
        const typeField = document.createElement('select');

        const waterType = document.createElement('option');
        waterType.setAttribute('name', 'water');
        waterType.innerHTML = 'Water';
        typeField.appendChild(waterType);

        const fireType = document.createElement('option');
        fireType.setAttribute('name', 'fire');
        fireType.innerHTML = 'Vuur';
        typeField.appendChild(fireType);

        const earthType = document.createElement('option');
        earthType.setAttribute('name', 'earth');
        earthType.innerHTML = 'Aarde';
        typeField.appendChild(earthType);

        const windType = document.createElement('option');
        windType.setAttribute('name', 'wind');
        windType.innerHTML = 'Wind';
        typeField.appendChild(windType);

        return typeField;
    }
}
