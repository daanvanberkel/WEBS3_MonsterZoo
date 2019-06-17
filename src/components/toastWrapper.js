export class ToastWrapper extends HTMLElement {
    constructor(data) {
        super();
    }

    addToast(message, success = false){
        let toastEl = document.createElement("p");
        toastEl.classList.add("toast");
        toastEl.classList.add(success == false ? 'error' : 'success');
        toastEl.innerText = message;
        this.appendChild(toastEl);

        setTimeout(() => {
            toastEl.classList.add('hide');

            setTimeout(() => {
                toastEl.remove();
            }, 700);
        }, 1400);
    }

}