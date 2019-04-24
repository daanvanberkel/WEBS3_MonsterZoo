export class StatisticsView {
    show(cage) {
        const statistics = document.querySelector('#statistics-content');
        const monster_details = document.querySelector('#monster-details');

        if (!cage.monster) {
            monster_details.innerHTML = `<p>Er zit (nog) geen monster in dat verblijf.</p>`;
        } else {
            monster_details.innerHTML = `<p>Je klikt op monster ${cage.monster}!</p>`;
        }
        
        statistics.classList.add('show');
    }
}
