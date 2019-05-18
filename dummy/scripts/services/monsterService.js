import { Monster } from "../models/monster";

export class MonsterService {
    /**
     * Get all monsters from localstorage
     */
    getMonsters() {
        return new Promise(resolve => {
            let monsters = localStorage.getItem('monsters');

            if (!monsters) {
                resolve([]);
                return;
            }

            monsters = JSON.parse(monsters);

            if (!Array.isArray(monsters)) {
                localStorage.removeItem('monsters');
                resolve([]);
                return;
            }

            for(let rows of monsters) {
                for(let monster of rows) {
                    monster = Object.assign(new Monster, monster);
                }
            }

            resolve(monsters);
        });
    }

    /**
     * Get monster from localstorage at specific row and column
     * 
     * @param {number} row Monster row
     * @param {number} col Monster column
     */
    getMonster(row, col) {
        return new Promise(resolve => {
            this.getMonsters().then(monsters => {
                if (!monsters[row]) {
                    resolve(null);
                    return;
                }

                if (!monsters[row][col]) {
                    resolve(null);
                    return;
                }

                resolve(monsters[row][col]);
            });
        });
    }

    /**
     * Save monster to localstorage
     * 
     * @param {Monster} monster 
     * @param {number} row 
     * @param {number} col 
     */
    saveMonster(monster) {
        return new Promise((resolve, reject) => {
            if (this.getMonster(monster.row_pos, monster.col_pos)) {
                reject(new Error("Er is al een monster aanwezig in dit verblijf!"));
                return;
            }

            this.getMonsters().then(monsters => {
                if (!monsters[row]) {
                    monsters[row] = {};
                }

                monsters[row][col] = monster;

                localStorage.setItem('monsters', JSON.stringify(monsters));

                resolve();
            });
        });
    }

    /**
     * Delete monster from localstorage
     * 
     * @param {number} row 
     * @param {number} col 
     */
    deleteMonster(row, col) {
        return new Promise(resolve => {
            this.getMonsters().then(monsters => {
                if (monsters[row]) {
                    delete monsters[row][col];
                }

                localStorage.setItem('monsters', JSON.stringify(monsters));

                resolve();
            });
        });
    }
}
