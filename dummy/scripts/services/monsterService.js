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

            for(let monster of monsters) {
                monster = Object.assign(new Monster, monster);
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
                resolve(monsters.find(monster => monster.row_pos === row && monster.col_pos === col));
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
            if (!monster.row_pos || !monster.col_pos) {
                reject(new Error("Monster row position or column position is missing"));
                return;
            }

            if (this.getMonster(monster.row_pos, monster.col_pos)) {
                reject(new Error("Er is al een monster aanwezig in dit verblijf!"));
                return;
            }

            this.getMonsters().then(monsters => {
                monsters.push(monster);

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
        return new Promise((resolve, reject) => {
            this.getMonsters().then(monsters => {
                let monster = monsters.find(m => m.row_pos === row && m.col_pos === col);

                if (!monster) {
                    reject(new Error("Er zit geen monster in dit verblijf!"));
                    return;
                }

                let index = monsters.indexOf(monster);

                monsters.splice(index, 1);

                localStorage.setItem('monsters', JSON.stringify(monsters));
            });
        });
    }
}
