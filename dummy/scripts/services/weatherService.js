const api_key = "d9e90384775bc92904004bffe3c53aef";

export class WeatherService {
    constructor() {
        this.weather = {};
        this.useApi = true;

        // In the javascript console use 'weatherControler.overrideApi()' to change the weather.
        window.weatherControl = {
            overrideApi: (raining, temp) => {
                this.useApi = false;
                this.weather = {
                    raining: raining,
                    temp: temp
                };

                console.log(`Set weather to ${JSON.stringify(this.weather)}`);
            },

            useApi: () => {
                this.useApi = true;

                console.log('Using API for weather data');
            }
        };
    }

    getWeather(city) {
        return new Promise((resolve, reject) => {
            if (this.useApi) {
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=nl&units=metric`).then(response => {
                    return response.json();
                }).then(response => {
                    let weather = {
                        temp: response.main.temp
                    };

                    for(let w of response.weather) {
                        if (w.main === "Rain") {
                            weather.raining = true;
                            break;
                        }
                    }

                    resolve(weather);
                }).catch(reject);
            } else {
                resolve(this.weather);
            }
        });
    }
}
