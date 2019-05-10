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
        image.src = "/images/Monsters/Fire/Fire1.png";

        this.appendChild(image);
    }

    renderFields() {
        this.appendChild(this.createLabel("Type:"));
        this.appendChild(this.createTypeField());

        this.appendChild(this.createLabel("Naam:"));
        this.appendChild(this.createNameField());

        this.appendChild(this.createLabel("Armen:"));
        this.appendChild(this.createArmsField());

        this.appendChild(this.createLabel("Benen:"));
        this.appendChild(this.createLegsField());

        this.appendChild(this.createLabel("Ogen:"));
        this.appendChild(this.createEyesField());

        this.appendChild(this.createButtons());
    }

    createLabel(name) {
        const label = document.createElement('label');
        label.innerHTML = name;

        return label;
    }

    createSelectField(name, options) {
        const select = document.createElement('select');
        select.setAttribute('name', name);

        for(let option of options) {
            if (!option.name || !option.title) continue;

            const el = document.createElement('option');
            el.setAttribute('name', option.name);
            el.innerHTML = option.title;

            select.appendChild(el);
        }

        return select;
    }

    createTypeField() {
        const options = [
            {
                name: 'water',
                title: 'Water'
            },
            {
                name: 'fire',
                title: 'Vuur'
            },
            {
                name: 'earth',
                title: 'Aarde'
            },
            {
                name: 'wind',
                title: 'Wind'
            }
        ];

        return this.createSelectField('type', options);
    }

    createArmsField() {
        const options = [];

        // TODO: Baseren op basis van geselecteerd monster type
        for(let i = 0; i < 8; i++) {
            options.push({
                name: `arms-${i + 1}`,
                title: `${i + 1} armen`
            });
        }

        return this.createSelectField('arms', options);
    }

    createLegsField() {
        const options = [];

        // TODO: Baseren op basis van geselecteerd monster type
        for(let i = 0; i < 3; i++) {
            options.push({
                name: `legs-${i + 1}`,
                title: `${i + 1} benen`
            });
        }

        return this.createSelectField('legs', options);
    }

    createEyesField() {
        const options = [];

        // TODO: Baseren op basis van geselecteerd monster type
        for(let i = 0; i < 2; i++) {
            options.push({
                name: `eyes-${i + 1}`,
                title: `${i + 1} ogen`
            });
        }

        return this.createSelectField('eyes', options);
    }

    createNameField() {
        const field = document.createElement('input');
        field.setAttribute('name', 'name');
        field.setAttribute('placeholder', 'Naam');

        return field;
    }

    createButtons() {
        const container = document.createElement('div');
        container.classList.add('btn-container');

        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = 'X';
        cancelBtn.setAttribute('id', 'configurator-cancel-btn');
        container.appendChild(cancelBtn);

        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = "Opslaan";
        saveBtn.setAttribute('id', 'configurator-save-btn');
        container.appendChild(saveBtn);

        return container;
    }
}
