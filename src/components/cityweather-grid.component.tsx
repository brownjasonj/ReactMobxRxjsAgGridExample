import * as React from "react";
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';

import { WeatherState } from '../state/weather.state';

interface Props {
    weatherState : WeatherState;
}

@observer 
class CityWeatherGrid extends React.Component<Props, {}> {
    private columnDefs: any[] = [
            {
                headerName: 'City',
                field: 'name',
                width: 30,
                checkboxSelection: false,
                suppressSorting: false,
                suppressMenu: false, 
                pinned: false
            }
    ];

    private _icons: any = {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            };

    private _showGrid: boolean;
    private _showToolPanel: boolean;
    private _quickFilterText: string;
    private _gridOptions: any;
    private _api: any;
    private _columnApi: any;

    constructor(props: Props) {
        super(props);
            
        this._quickFilterText = null,
        this._showGrid = true,
        this._showToolPanel = false,

        // the grid options are optional, because you can provide every property
        // to the grid via standard React properties. however, the react interface
        // doesn't block you from using the standard JavaScript interface if you
        // wish. Maybe you have the gridOptions stored as JSON on your server? If
        // you do, the providing the gridOptions as a standalone object is just
        // what you want!
        this._gridOptions = {
            //We register the react date component that ag-grid will use to render
            // dateComponentFramework:MyReactDateComponent,
            // this is how you listen for events using gridOptions
            onModelUpdated: function () {
                console.log('event onModelUpdated received');
            },
            // defaultColDef : {
            //     headerComponentFramework : MyReactHeaderComponent,
            //     headerComponentParams : {
            //         menuIcon: 'fa-bars'
            //     }
            // },
            // this is a simple property
            rowBuffer: 10 // no need to set this, the default is fine for almost all scenarios
        };
    }

    @computed get cityList() {
        const cities: any[] = this.props.weatherState.cityList.map((name) => {return {'name': name}});
        console.log(cities);
        return cities;
    }

    onShowGrid(show: any) {
        this._showGrid = show;
    }

    onToggleToolPanel(event: any) {
        this._showToolPanel = event.target.checked;
    }

    onGridReady(params: any) {
        this._api = params.api;
        this._columnApi = params.columnApi;
    }

    selectAll() {
        this._api.selectAll();
    }

    deselectAll() {
        this._api.deselectAll();
    }

    setCountryVisible(visible: any) {
        this._columnApi.setColumnVisible('country', visible);
    }

    onQuickFilterText(event: any) {
        this._quickFilterText = event.target.value;
    }

    onCellClicked(event: any) {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    }

    onRowSelected(event: any) {
        console.log('onRowSelected: ' + event.node.data.name);
    }

    onRefreshData() {
        console.log(this.cityList);
    }

    invokeSkillsFilterMethod() {
        var skillsFilter = this._api.getFilterInstance('skills');
        var componentInstance = skillsFilter.getFrameworkComponentInstance();
        componentInstance.helloFromSkillsFilter();
    }

    dobFilter () {
        let dateFilterComponent = this._gridOptions.api.getFilterInstance('dob');
        dateFilterComponent.setFilterType('equals');
        dateFilterComponent.setDateFrom('2000-01-01');
        this._gridOptions.api.onFilterChanged();

    }

    render() {
        var gridTemplate: any;
        var bottomHeaderTemplate: any;
        var topHeaderTemplate: any;

        topHeaderTemplate = (
            <div>
                <div style={{float: 'right'}}>
                    <input type="text" onChange={this.onQuickFilterText.bind(this)}
                           placeholder="Type text to filter..."/>
                    <button id="btDestroyGrid" disabled={!this._showGrid}
                            onClick={this.onShowGrid.bind(this, false)}>Destroy Grid
                    </button>
                    <button id="btCreateGrid" disabled={this._showGrid} onClick={this.onShowGrid.bind(this, true)}>
                        Create Grid
                    </button>
                </div>
                <div style={{padding: '4px'}}>
                    <b>Employees Skills and Contact Details</b> <span id="rowCount"/>
                </div>
            </div>
        );

        // showing the bottom header and grid is optional, so we put in a switch
        if (this._showGrid) {
            bottomHeaderTemplate = (
                <div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <span>
                            Grid API:
                            <button onClick={this.selectAll.bind(this)}>Select All</button>
                            <button onClick={this.deselectAll.bind(this)}>Clear Selection</button>
                        </span>
                        <span style={{marginLeft: 20}}>
                            Column API:
                            <button onClick={this.setCountryVisible.bind(this, false)}>Hide Country Column</button>
                            <button onClick={this.setCountryVisible.bind(this, true)}>Show Country Column</button>
                        </span>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <span>
                        <label>
                            <input type="checkbox" onChange={this.onToggleToolPanel.bind(this)}/>
                            Show Tool Panel
                        </label>
                        <button onClick={this.onRefreshData.bind(this)}>Refresh Data</button>
                            </span>
                        <span style={{marginLeft: 20}}>
                            Filter API:
                            <button onClick={this.invokeSkillsFilterMethod.bind(this, false)}>Invoke Skills Filter Method</button>
                            <button onClick={this.dobFilter.bind(this)}>DOB equals to 01/01/2000</button>
                        </span>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            );

            gridTemplate = (
                <div style={{height: 400}} className="ag-fresh">
                    <AgGridReact
                        // gridOptions is optional - it's possible to provide
                        // all values as React props
                        gridOptions={this._gridOptions}

                        // listening for events
                        onGridReady={this.onGridReady.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        onCellClicked={this.onCellClicked.bind(this)}

                        // binding to simple properties
                        showToolPanel={this._showToolPanel}
                        quickFilterText={this._quickFilterText}

                        // binding to an object property
                        icons={this._icons}

                        // binding to array properties
                        columnDefs={this.columnDefs}
                        rowData={this.cityList}

                        // no binding, just providing hard coded strings for the properties
                        suppressRowClickSelection="true"
                        rowSelection="multiple"
                        enableColResize="true"
                        enableSorting="true"
                        enableFilter="true"
                        groupHeaders="true"
                        rowHeight="22"
                        debug="true"
                    />
                </div>
            );
        }

        return <div style={{width: '1024px'}}>
            <div style={{padding: '4px'}}>
                {topHeaderTemplate}
                {bottomHeaderTemplate}
                {gridTemplate}
            </div>
        </div>;
    }

}

export { CityWeatherGrid }