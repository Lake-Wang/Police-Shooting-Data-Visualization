import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { SymbolMap } from "./symbolMap";
import { SymmetricBarChart } from "./charts";
import { Tooltip } from "./tooltip";
import * as d3 from 'd3';
import { Scales } from "./scale";
import { Legend } from "./legend";
import { Map } from './map';
import { BarChart } from './charts';
import { MultipleLineChart } from './linecharts';
import { View4_national, View4_state } from "./View4";
import { Dropdown } from "./dropdown";
import * as bootstrap from 'bootstrap';


// map and chart data source
const stack_csv = "https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/70faf9eeb3d84a7685502b0a9acb9443fb2fa730/stack_area_chart_data.csv";
const map_json = 'https://gist.githubusercontent.com/Evan-Unofficial/db447b2d0029ba68e3a846cc007c379f/raw/b0be5e852527720cc0fdd4ee12bd5af6752345e4/gz_2010_us_040_00_5m.json';
const map_and_bar = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/70faf9eeb3d84a7685502b0a9acb9443fb2fa730/new_map_and_bar.csv';
const ethnicity_national = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/70faf9eeb3d84a7685502b0a9acb9443fb2fa730/ethnicity_national.csv';
const recorded_national = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/70faf9eeb3d84a7685502b0a9acb9443fb2fa730/if_recorded_national.csv';
const unarmed_national = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/b964c4478c34539eb1612c6d4f6d9a8784fe3842/new_unarmed_shooting_by_eth_national.csv';
const ethnicity_state = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/b964c4478c34539eb1612c6d4f6d9a8784fe3842/new_ethnicity_state_wise.csv';
const recorded_state = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/b964c4478c34539eb1612c6d4f6d9a8784fe3842/new_if_recorded_state_wise.csv';
const unarmed_state = 'https://gist.githubusercontent.com/Evan-Unofficial/7e72bdb94e5c0fe700b680dcc5404f66/raw/b964c4478c34539eb1612c6d4f6d9a8784fe3842/new_unarmed_shooting_by_eth_state_wise.csv';

function use_stack_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.total_case = +d.total_case;
                d.unarmed_case = +d.unarmed_case;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_map_and_bar_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.total_case = +d.total_case;
                d.unarmed_case = +d.unarmed_case;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}

function use_recorded_national_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.recorded = +d.recorded;
                d.unrecorded = +d.unrecorded;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_recorded_state_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.recorded = +d.recorded;
                d.unrecorded = +d.unrecorded;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_ethnicity_national_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.Asian = +d.Asian;
                d.Hispanic = +d.Hispanic;
                d.Black = +d.Black;
                d.Other = +d.Other;
                d.White = +d.White;
                d.Native = +d.Native;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_ethnicity_state_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.Asian = +d.Asian;
                d.Hispanic = +d.Hispanic;
                d.Black = +d.Black;
                d.Other = +d.Other;
                d.White = +d.White;
                d.Native = +d.Native;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_unarmed_national_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.percentage = +d.percentage;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function use_unarmed_state_data(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.percentage = +d.percentage;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function PoliceShootings(){
    const [year, setYear] = React.useState('2');
    const [selectedState, setSelectedState] = React.useState(null);
    const [Attr, setAttr] = React.useState('recorded');
    // const WIDTH = 1200;
    // const HEIGHT = 800;
    // const margin = { top: 20, right: 40, bottom: 160, left: 40, gap:40 };
    // const innerWidth = WIDTH - margin.left - margin.right;
    // const innerHeight = HEIGHT - margin.top - margin.bottom;
    
    const map_and_bar_data = use_map_and_bar_data(map_and_bar);
    const map = useMap(map_json);
    const stack_chart_data = use_stack_data(stack_csv);
    const recorded_national_total_data = use_recorded_national_data(recorded_national)
    const recorded_state_total_data = use_recorded_state_data(recorded_state)
    const ethnicity_national_total_data = use_ethnicity_national_data(ethnicity_national)
    const ethnicity_state_total_data = use_ethnicity_state_data(ethnicity_state)
    const unarmed_national_total_data = use_unarmed_national_data(unarmed_national)
    const unarmed_state_total_data = use_unarmed_state_data(unarmed_state)

    const YEAR = ['2015', '2016', '2017', '2018', '2019'];
    
        if (!map || !map_and_bar_data) {
            return <pre>Loading...</pre>;
        };

    const total_case_dic = {};

    const changeHandler = (event) => {
        setYear(event.target.value);
    }
    const onAttrChange = ( attr ) => {
        setAttr(attr);
    }
    const data = map_and_bar_data.filter( d => {
        return d.year === YEAR[year];
    });
    const recorded_national_data = recorded_national_total_data.filter( d => {
        return d.year === YEAR[year];
    });
    const ethnicity_national_data = ethnicity_national_total_data.filter( d => {
        return d.year === YEAR[year];
    });
    const unarmed_national_data = unarmed_national_total_data.filter( d => {
        return d.year === YEAR[year];
    });
    const recorded_state_data = recorded_state_total_data.filter( d => {
        return d.year === YEAR[year] && d.state === selectedState;
    });
    const ethnicity_state_data = ethnicity_state_total_data.filter( d => {
        return d.year === YEAR[year] && d.state === selectedState;
    });
    const unarmed_state_data = unarmed_state_total_data.filter( d => {
        return d.year === YEAR[year] && d.state === selectedState;
    });

const width = 1500;
const height = 1300;
const startRange = [0, d3.max(data, d => d.total_case)];
const colorRange = [d3.interpolateReds(0), d3.interpolateReds(1)];
const colormap = Scales.colormapLinear(startRange, colorRange);
const options = [{value: "recorded", label: "Usage of Body Camera"}, {value: "ethnicity", label: "Ethnicity Distribution"},
        {value: "unarmed", label: "Proportion of Unarmed Victims in Shooting"}];
//console.log(ethnicity_state_data)
const titles = {
    "recorded": "Usage of Body Camera",
    "ethnicity": "Ethnicity Distribution",
    "unarmed": "Proportion of Unarmed Victims in Shooting"
};

const content = {
    "recorded": "The BLUE section of the pie chart represents the proportion of police shooting cases that are\
    recorded by a body camera, while the RED section represents the ratio that are not",
    "ethnicity": "The pie chart below represents the ethnicity distribution of the shooting cases",
    "unarmed": "The bar chart below compares the portion of unarmed victims across different ethnicities within shooting cases"
}

return <div className="land">
    <div>
        <h1 className="headline">Police Shootings in the United States</h1>
    </div>

    <div className="interiors">
        <label className="form-label" >Year Selected: {YEAR[year]}</label>
        <input key="slider" id="customRange1" className="form-range" type='range' min='0' max='4' value={year} step='1' onChange={changeHandler} />
        
        <Dropdown options={options} id={"selector"} selectedValue={Attr} onSelectedValueChange={onAttrChange}/>
    </div>

    <div className="subtitle1">
        <h2> Introduction</h2>
        <p className="content">The justice of police shootings within the United states has never lost its popularity among the most discussed topics.
            Therefore, in light of the data collected within a five year span recording the police shootings nationwide, we constructed
            an information visualization project. We aim to showcase the distribution of the shooting cases and their characteristics accordingly.
        </p>
    </div>

    <div className="subtitle2">
        <h2> Nationwide VS Statewise Data: {titles[Attr]}</h2>
        <p className="content2">{content[Attr]}</p>
    </div>
    
    <div className="container">
        <svg width={width + 100} height={height + 500}>
            <g transform={`translate(${0}, ${500})`}>
                <Map map={map} data={data} height={300} width={600} colormap={colormap} selectedState={selectedState} setSelectedState={setSelectedState} />
                <Legend x={100} y={300 + 50} width={400} height={10} numberOfTicks={6} rangeOfValues={[0, d3.max(data, d => d.total_case)]} colormap={colormap} />
                
            </g>
            <g transform={`translate(${700}, ${500})`}><BarChart offsetX={0} offsetY={20} data={data} height={300} width={400} selectedState={selectedState} setSelectedState={setSelectedState}/></g>
            <g transform={`translate(${700}, ${100})`}><MultipleLineChart x={0} y={20} data={stack_chart_data} height={300} width={400} year={year} setYear={setYear} /></g>
            <g transform={`translate(${100}, ${1150})`}><View4_national Attr={Attr} ethnicity_data={ethnicity_national_data} recorded_data={recorded_national_data} unarmed_data={unarmed_national_data} height={400} width={400}/></g>
            <g transform={`translate(${700}, ${1150})`}><View4_state Attr={Attr} ethnicity_data={ethnicity_state_data} recorded_data={recorded_state_data} unarmed_data={unarmed_state_data} national_data={unarmed_national_data} height={400} width={400} selectedState={selectedState}/></g>
        </svg>
        
    </div>
</div>
        
}

ReactDOM.render(<PoliceShootings/ >, document.getElementById("root"));