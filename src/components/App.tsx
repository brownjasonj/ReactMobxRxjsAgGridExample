import * as React from 'react'
import { observer, inject } from 'mobx-react';

import { WeatherForecastService, WeatherData, Weather } from '../services/weather-forecast.service';

import { WeatherState } from '../state/weather.state';

import { SearchBar } from './search-bar.component';
import { CityList } from './city-list.component';
import { CityWeatherGrid } from './cityweather-grid.component';
import { NavBar } from './navbar.component';

interface Props {
    store : WeatherState ;
};

@inject("store")
class App extends React.Component<any, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar weatherState={this.props.store} />
                <CityWeatherGrid weatherState={this.props.store} />
            </div>
        );
    }
}

export { App };