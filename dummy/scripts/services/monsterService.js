import { Monster } from "../models/monster.js";

export class MonsterService {
    /**
     * Get all monsters from localstorage
     */
    getMonsters(mapType) {
        return new Promise(resolve => {
            let stored = localStorage.getItem('monsters');

            if (!stored) {
                resolve({});
                return;
            }

            stored = JSON.parse(stored);
            let monsters = {};

            for(let type in stored) {
                monsters[type] = {};

                for(let row in stored[type]) {
                    monsters[type][row] = {};

                    for(let col in stored[type][row]) {
                        let data = stored[type][row][col];

                        // skip empty monster
                        if (Object.entries(data).length === 0 && data.constructor === Object){
                            continue;
                        }
                        
                        monsters[type][row][col] = Object.assign(new Monster, data);
                    }
                }
            }
            
            if (mapType) {
                resolve(monsters[mapType]);
            } else {
                resolve(monsters);
            }
        });
    }

    /**
     * Get monster from localstorage at specific row and column
     * 
     * @param {string} type Grid type (ex. forest)
     * @param {number} row Monster row
     * @param {number} col Monster column
     */
    getMonster(type, row, col) {
        return new Promise(resolve => {
            this.getMonsters().then(monsters => {
                if (!monsters[type] || !monsters[type][row] || !monsters[type][row][col]) {
                    resolve(null);
                    return;
                }

                resolve(monsters[type][row][col]);
            });
        });
    }

    /**
     * Save monster to localstorage
     * 
     * @param {Monster} monster 
     * @param {string} type     Grid type (ex. forest)
     * @param {number} row 
     * @param {number} col 
     */
    saveMonster(monster, type, row, col) {
        return new Promise((resolve, reject) => {
            this.getMonster(type, row, col).then(m => {
                if (m) {
                    reject(new Error("Er is al een monster aanwezig in dit verblijf!"));
                    return;
                }
    
                this.getMonsters().then(monsters => {
                    if (!monsters[type]) {
                        monsters[type] = {};
                    }

                    if (!monsters[type][row]) {
                        monsters[type][row] = {};
                    }
    
                    monsters[type][row][col] = monster;
    
                    localStorage.setItem('monsters', JSON.stringify(monsters));
    
                    resolve();
                });
            });
        });
    }

    /**
     * Delete monster from localstorage
     * 
     * @param {string} type Grid type (ex. forest)
     * @param {number} row 
     * @param {number} col 
     */
    deleteMonster(type, row, col) {
        
        return new Promise(resolve => {
            this.getMonsters().then(monsters => {
                if (monsters[type] && monsters[type][row]) {
                    delete monsters[type][row][col];
                }

                localStorage.setItem('monsters', JSON.stringify(monsters));

                resolve();
            });
        });
    }
}
