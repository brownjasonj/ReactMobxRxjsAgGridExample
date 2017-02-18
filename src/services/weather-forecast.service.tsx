import * as React from 'react';
import { Observable } from 'rxjs';
import { RxHttpRequest } from 'rx-http-request';

interface Weather {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    }
}

interface WeatherData {
    city : { 
        name: string,
        coord: {
            lon: number,
            lat: number
        },
        country: string,
        population: number
    };
    list : Weather[];
}

class WeatherForecastService {
    private static API_KEY: string = "b34037c48d2a927f6e3948abd61eba67";
    private static ROOT_URL: string = `http://api.openweathermap.org/data/2.5/forecast?appid=${WeatherForecastService.API_KEY}`;

    constructor() {
    }

    getWeather(city: string, countrycode: string) : any {
        const url = `${WeatherForecastService.ROOT_URL}&q=${city},${countrycode}`;

        console.log("Request: " + url);

        return RxHttpRequest.get(`${url}`, {json: true});
    }
}

export { WeatherForecastService, WeatherData, Weather};