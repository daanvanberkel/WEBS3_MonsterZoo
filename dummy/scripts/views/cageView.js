export class CageView {
    drawCage(element, cage) {
        if (!cage.roomForMonster) {
            element.style.background = 'brown';
        } else {
            element.style.background = 'green';
        }
    }
}
