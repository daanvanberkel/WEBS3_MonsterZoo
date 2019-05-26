export class WeatherView {
    constructor() {
        this.element = document.querySelector('#weatherContainer')
    }

    drawWeather(weather) {
        // Clear element
        this.element.innerHTML = '';

        const icon = document.createElement('img');
        icon.src = weather.raining ? '/images/rain.svg' : '/images/sun.svg';
        icon.classList.add('weather-icon');

        this.element.appendChild(icon);

        const temp = document.createElement('span');
        temp.innerText = `${weather.temp} °C`;
        temp.classList.add('weather-temp');

        this.element.appendChild(temp);
    }

    clearWeather() {
        this.element.innerHTML = '';
    }
}
