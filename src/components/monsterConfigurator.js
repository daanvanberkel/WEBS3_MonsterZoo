import { Monster } from "../models/monster.js";

export class MonsterConfiguratorComponent extends HTMLElement {

  constructor() {
    super();

    /* MONSTER VALUES */
    this.monster = new Monster();

    this.options = {
      type: [
        {
          value: "water",
          name: "Water"
        },
        {
          value: "fire",
          name: "Vuur"
        },
        {
          value: "earth",
          name: "Aarde"
        },
        {
          value: "wind",
          name: "Wind"
        }
      ],
      arms: [
        {
          value: 2,
          name: "2 Armen"
        },
        {
          enableIf: [{ type: ["water", "fire"] }],
          value: 4,
          name: "4 Armen"
        },
        {
          enableIf: [{ type: ["water", "fire"] }],
          value: 6,
          name: "6 Armen"
        },
        {
          enableIf: [{ type: ["water"] }],
          value: 8,
          name: "8 Armen"
        }
      ],
      armType: [
        {
          enableIf: [{ type: ["water", "fire"] }],
          value: "tentacle",
          name: "Tentakels"
        },
        {
          enableIf: [{ type: ["water"] }],
          value: "fins",
          name: "Vinnen"
        },
        {
          enableIf: [{ type: ["fire", "earth"] }],
          value: "claws",
          name: "Klauwen"
        },
        {
          enableIf: [{ type: ["fire", "wind"] }],
          value: "claw-wings",
          name: "Klauw Vleugels"
        },
        {
          enableIf: [{ type: ["wind"] }],
          value: "wings",
          name: "Vleugels"
        }
      ],
      legs: [
        {
          enableIf: [
            { type: ["water", "wind", "fire"] }, 
          ],
          value: 0,
          name: "0 Legs"
        },
        {
          enableIf: [
            { type: ["water"], arms: [2, 4] },
            { type: ["fire"], arms: [2] },
            { type: ["earth", "wind"] },
          ],
          value: 2,
          name: "2 Legs"
        },
        {
          enableIf: [{ type: ["water"], arms: [2, 4] }, { type: ["earth"] }],
          value: 4,
          name: "4 Legs"
        },
        {
          enableIf: [{ type: ["earth"] }],
          value: 6,
          name: "6 Legs"
        }
      ],
      eyes: [
        {
          enableIf: [
            { type: ["water", "fire", "earth", "wind"] }
          ],
          value: 2,
          name: "2 Eyes"
        },
        {
          enableIf: [
            { type: ["water", "fire"] }
          ],
          value: 4,
          name: "4 Eyes"
        },
        {
          enableIf: [
            { type: ["water"] }
          ],
          value: 6,
          name: "6 Eyes"
        },
        {
          enableIf: [
            { type: ["water"] }
          ],
          value: 8,
          name: "8 Eyes"
        }
      ],
      fur: [
        {
          enableIf: [
            { type: ["water", "fire", "earth", "wind"] }
          ],
          value: "scales",
          name: "Schubben"
        },
        {
          enableIf: [
            { type: ["water", "earth"] }
          ],
          value: "slime",
          name: "Slijm"
        },
        {
          enableIf: [
            { type: ["fire", "wind"] }
          ],
          value: "feathers",
          name: "Veren"
        },
        {
          enableIf: [
            { type: ["earth", "wind"] }
          ],
          value: "hair",
          name: "Haar"
        }
      ],
      fly: [
        {
          enableIf: [
            { type: ["water", "earth", "fire"] },
          ],
          value: false,
          name: "Nee"
        },
        {
          enableIf: [
            { type: ["wind"] },
            { type: ["fire"], fur : ['feathers'] }
          ],
          value: true,
          name: "Ja"
        }
      ],
      swim: [
        {
          enableIf: [
            { type: ["fire", "earth", "wind"] }
          ],
          value: false,
          name: "Nee"
        },
        {
          enableIf: [
            { type: ["water"] },
            { type: ["wind"], fur : ['scales'] }
          ],
          value: true,
          name: "Ja"
        }
      ],
      color: [
        {
          enableIf: [
            { type: ["water", "wind"] },
          ],
          value: "blue",
          name: "Blauw"
        },
        {
          enableIf: [
            { type: ["water", "fire"] },
          ],
          value: "red",
          name: "Rood"
        },
        {
          enableIf: [
            { type: ["water"] },
          ],
          value: "green",
          name: "Groen"
        },
        {
          enableIf: [
            { type: ["fire", "earth"] },
          ],
          value: "orange",
          name: "Oranje"
        },
        {
          enableIf: [
            { type: ["fire"] },
          ],
          value: "braun",
          name: "Bruin"
        },
        {
          enableIf: [
            { type: ["earth", "wind"] },
          ],
          value: "purple",
          name: "Paars"
        },
        {
          enableIf: [
            { type: ["earth", "wind"] },
          ],
          value: "white",
          name: "Wit"
        }
      ]
    };

    /* FIELD ELEMENTS */
    this.fieldElements = {
      img: null,
      name: null,
      type: null,
      arms: null,
      armType: null,
      legs: null,
      eyes: null,
      fur: null,
      fly: null,
      swim: null,
      color: null
    };
  }

  connectedCallback() {

    // create default water monster
    this.monster.type = "water";
    this.monster.arms = 2;
    this.monster.armType = "tentacle";
    this.monster.legs = 2;
    this.monster.eyes = 2;
    this.monster.fur = 'scales';
    this.monster.fly = false;
    this.monster.swim = true;
    this.monster.color = 'blue';

    this.render();
  }


  render() {
    this.setMonsterImageField();
    this.renderFields();
  }

  update(monster){
    this.monster = monster;
    console.log("updating configurator", this.monster);
    this.setSelectOptions();
    const imgUrl = this.monster.imgFile;
    this.fieldElements["img"].src = imgUrl;
    this.fieldElements["name"].value = this.monster.name;
    this.fieldElements["type"].value = this.monster.type; 
    this.fieldElements["arms"].value = this.monster.arms; 
    this.fieldElements["armType"].value = this.monster.armType; 
    this.fieldElements["legs"].value = this.monster.legs; 
    this.fieldElements["eyes"].value = this.monster.eyes; 
    this.fieldElements["fur"].value = this.monster.fur; 
    this.fieldElements["fly"].value = this.monster.fly; 
    this.fieldElements["swim"].value = this.monster.swim; 
    this.fieldElements["color"].value = this.monster.color;
  }


  /**
   * Render the monster icon
   */
  setMonsterImageField() {
    this.fieldElements["img"] = document.createElement("img");
    this.fieldElements["img"].classList.add("monster-icon");
    this.setMonsterImage();
  }


  /**
   * Render new monster image based from type
   */
  setMonsterImage() {
    this.monster.imageIndex = Math.floor(Math.random() * 4) + 1;
    this.fieldElements["img"].src = this.monster.imgFile;
  }


  /**
   * Render all the fields with event handlers
   */
  renderFields() {
    this.setNameField();
    this.setTypeField();
    this.setSelectField('arms', (val) => parseInt(val));
    this.setSelectField('armType');
    this.setSelectField('legs', (val) => parseInt(val));
    this.setSelectField('eyes', (val) => parseInt(val));
    this.setSelectField('fur');
    this.setSelectField('fly');
    this.setSelectField('swim');
    this.setSelectField('color');

    // set all options of the selects
    this.setSelectOptions();

    // add all fields to the monster configurator
    for (var fieldName in this.fieldElements) {
      
      const field = this.fieldElements[fieldName];

      if (field == null) { continue; }

      if (field.name != "") {
        const label = document.createElement("label");
        label.innerHTML = field.name;
        this.appendChild(label);
      }

      this.appendChild(field);
    }

    this.appendChild(this.createButtons());
  }

  setNameField() {
    const nameField = this.createTextField("name", "Naam");

    nameField.addEventListener("keyup", e => {
      this.monster.name = e.target.value;
    });

    this.fieldElements["name"] = nameField;
  }

  setTypeField() {
    const selectField = this.createSelectField("type", this.options["type"]);

    selectField.addEventListener("change", e => {
      this.monster.type = e.target.options[e.target.selectedIndex].value;
      this.setSelectOptions();
      this.setMonsterImage();
    });

    this.fieldElements["type"] = selectField;
  }

  setSelectField(name, valConverter){
    const field = this.createSelectField(name);

    field.addEventListener("change", e => {
      let value = e.target.options[e.target.selectedIndex].value;
      if (valConverter != undefined){ value = valConverter(value); }
      this.monster[name] = value;
      this.setSelectOptions();
    });

    this.fieldElements[name] = field;
  }


  /**
   * Add options to a all selected elements
   *
   * @param {HTMLElement} select
   * @param {Array} options
   */
  setSelectOptions() {

    for (let elementName in this.options) {

      // get select with all options
      let select = this.fieldElements[elementName];
      let options = this.options[elementName];

      const prevIndex = select.selectedIndex;

      // remove all prev option from select
      if (select.options != undefined) {
        for (var i = select.options.length - 1; i >= 0; i--) {
          select.remove(i);
        }
      }

      let addedOptions = []

      // loop trough all the options
      for (let option of options) {

        // check if this option needs to be filtered
        if (option.enableIf != undefined) {
          let addOption = false;

          // loop trough all the criteria sets
          for (var criteriaIndex in option.enableIf) {
            const criteria = option.enableIf[criteriaIndex];

            // check if all the attr matches with the option
            let allPropsMatches = true;
            for (var propName in criteria) {
              if (criteria[propName].includes(this.monster[propName]) == false) {
                allPropsMatches = false;
              }
            }

            addOption = allPropsMatches;

            // if critira matched, dont check other ones
            if (addOption == true) { 
              break;
            }
          }

          // if not any match, skip all
          if (addOption == false) {
            continue;
          }
        }

        // add option to select
        const el = document.createElement("option");
        el.setAttribute("value", option.value);
        el.innerHTML = option.name;
        select.appendChild(el);
        addedOptions.push(option)
        
      }

      // change monster attr if, the option is not avaliable anymore
      if (addedOptions.map(item => item.value).includes(this.monster[elementName]) == false){
        this.monster[elementName] = addedOptions[0].value;
      }

      // check if index is still avalible with new options
      if (prevIndex > -1 && prevIndex < select.length) {
        select.selectedIndex = prevIndex;
      }
    }
  }

  /**
   * Create select HTMLElement
   *
   * @param {String} name
   * @param {Array} options
   */
  createSelectField(name) {
    const select = document.createElement("select");
    select.setAttribute("name", name);
    return select;
  }

  /**
   * Create HTMLElement of a text input
   * @param {String} name
   * @param {String} placeholder
   */
  createTextField(name, placeholder) {
    const textField = document.createElement("input");
    textField.setAttribute("name", name);
    textField.setAttribute("placeholder", placeholder);
    return textField;
  }


  /**
   * Add the cancel and add button to the DOM
   */
  createButtons() {
    const container = document.createElement("div");
    container.classList.add("btn-container");

    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "X";
    cancelBtn.setAttribute("id", "configurator-cancel-btn");
    container.appendChild(cancelBtn);

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Opslaan";
    saveBtn.setAttribute("id", "configurator-save-btn");

    container.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
      if (!this.monster.name) {
        console.log("Monster needs a name!");
        // TODO: Show error to user
        return;
      }

      const event = new CustomEvent('monsterCreated', {
        detail: this.monster
      });
  
      this.dispatchEvent(event);
    });


    return container;
  }
}