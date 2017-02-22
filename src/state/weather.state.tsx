import { observable, computed} from 'mobx';

import {  WeatherData, Weather } from '../services/weather-forecast.service';

class WeatherState {
    @observable cityWeather: Map<string, WeatherData>;
    @observable cities: string[];

    constructor () {
        this.cityWeather = new Map<string, WeatherData>();
        this.cities = [];
    }

    @computed public get cityList() : string[]{
        return this.cities;
    }

    addCityWeather(weather : WeatherData) {
        this.cityWeather.set(weather.city.name, weather);
        this.cities.push(weather.city.name);
        console.log(`Add city ${weather.city.name}, ${weather.list}`);
    }
}

const weatherState = new WeatherState();

export { weatherState, WeatherState }