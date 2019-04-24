function drawGrid() {
    const zoo = document.querySelector('#zoo');
    const grid = document.createElement('div');
    grid.classList.add('zoo-grid');

    for(let r = 0; r < 10; r++) {
        const row = document.createElement('div');
        row.classList.add('zoo-row');

        for(let c = 0; c < 10; c++) {
            const col = document.createElement('div');
            col.classList.add('zoo-cage');
            col.innerText = `${r},${c}`;
            row.appendChild(col);
        }

        grid.appendChild(row);
    }

    zoo.appendChild(grid);
}

drawGrid();

document.querySelector('#zoo').addEventListener('click', e => {
    const statistics = document.querySelector('#statistics-content');
    const monster_details = document.querySelector('#monster-details');
    monster_details.innerHTML = '';

    if (e.target.classList.contains('zoo-cage')) {
        monster_details.innerHTML = `<p>Je klikt op monster ${e.target.innerHTML}!</p>`;
    }

    statistics.classList.add('show');
});
