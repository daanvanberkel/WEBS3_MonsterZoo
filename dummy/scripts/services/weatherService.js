const api_key = "d9e90384775bc92904004bffe3c53aef";

export class WeatherService {
    getWeather(city) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`).then(response => {
                return response.json();
            }).then(response => {
                resolve(response);
            }).catch(reject);
        });
    }
}
