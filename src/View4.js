import React from "react";
import { scaleLinear, scaleBand, area, max, curveBasis, min, schemePastel1, scaleOrdinal } from "d3";
import * as d3 from 'd3'


function PieChart_national_recorded(props) {
    const { data, height, width } = props;
    var recorded = data[0].recorded
    var unrecorded = data[0].unrecorded
    var total = recorded + unrecorded
    var recorded_percentage = recorded/total
    var unrecorded_percentage = unrecorded/total
    var s1 = Number(recorded_percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var s2 = Number(unrecorded_percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    const array = [{label:'recorded',value:recorded,percentage:s1}, {label:'unrecorded',value:unrecorded,percentage:s2}]

    const pie = d3
      .pie()
      .value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(140);
    const getColor = (d) => {
        return d.data.label === 'recorded' ? "steelblue" : "#ff4d4f";
    };
    const getPosition = (d) => {
        return d.data.label === 'recorded' ? -20 : 20;
    }
    const data_ready = pie(array)

    return <svg>
        <text style={{ textAnchor:'middle'}} transform={`translate(${200}, ${50})`}>
                    {'National level situation'}
                </text>
        {data_ready.map((d) => {
            return <g key={d.data.label} transform={`translate(${width/2}, ${height/2})`}>
            <path d={arc(d)} fill={getColor(d)} />
            <text style={{ textAnchor:'middle', alignmentBaseline:'middle' }} transform={`translate(${arc.centroid(d)[0]}, ${arc.centroid(d)[1]})`}>
                    {d.data.percentage}
                </text>
            <rect x={175} y={getPosition(d)} height={30} width={40} fill={getColor(d)}/>
            <text style={{ textAnchor:'start'}} transform={`translate(${220}, ${getPosition(d)+20})`}>
                    {d.data.label}
                </text>
            </g>
        })}
    </svg>
}


function PieChart_state_recorded(props) {
    const { data, height, width, selectedState } = props;
    
    if (!selectedState) {
        return <g>
            <text style={{ textAnchor:'middle'}} transform={`translate(${height/2}, ${width/2})`}>
                    {'Hover over a state'}
                </text>
        </g>;
    } else {
    
    var recorded = data[0].recorded
    var unrecorded = data[0].unrecorded
    var total = recorded + unrecorded
    var recorded_percentage = recorded/total
    var unrecorded_percentage = unrecorded/total
    var s1 = Number(recorded_percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var s2 = Number(unrecorded_percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    const array = [{label:'recorded',value:recorded,percentage:s1}, {label:'unrecorded',value:unrecorded,percentage:s2}]

    const pie = d3
      .pie()
      .value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(140);
    const getColor = (d) => {
        return d.data.label === 'recorded' ? "steelblue" : "#ff4d4f";
    };
    const getPosition = (d) => {
        return d.data.label === 'recorded' ? -20 : 20;
    }
    const data_ready = pie(array)

    return <g>
        <text style={{ textAnchor:'middle'}} transform={`translate(${200}, ${50})`}>
                    {`Situation in ${selectedState}`}
                </text>
        {data_ready.map((d) => {
            return <g key={d.data.label} transform={`translate(${width/2}, ${height/2})`}>
            <path class='image' d={arc(d)} fill={getColor(d)} />
            <text class='front' style={{ textAnchor:'middle', alignmentBaseline:'middle' }} transform={`translate(${arc.centroid(d)[0]}, ${arc.centroid(d)[1]})`}>
                    {d.data.percentage}
                </text>
            </g>
        })}
    </g>
}}


function PieChart_national_ethnicity(props) {
    const { data, height, width } = props;
    var black = data[0].Black
    var white = data[0].White
    var asian = data[0].Asian
    var hispanic = data[0].Hispanic
    var other = data[0].Other
    var native = data[0].Native
    var total = black+white+asian+hispanic+other+native

    var black_percentage = Number(black/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var white_percentage = Number(white/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var asian_percentage = Number(asian/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var hispanic_percentage = Number(hispanic/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var other_percentage = Number(other/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var native_percentage = Number(native/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});

    const array = [{label:'Black',value:black,percentage:black_percentage}, {label:'White',value:white,percentage:white_percentage},
                {label:'Asian',value:asian,percentage:asian_percentage}, {label:'Hispanic',value:hispanic,percentage:hispanic_percentage}, 
                {label:'Native',value:native,percentage:native_percentage}, {label:'Other',value:other,percentage:other_percentage}]

    const pie = d3
      .pie()
      .value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(140);

    const colorScale = scaleOrdinal()           
      .domain(['Black', 'White', 'Asian', 'Hispanic', 'Native', 'Other'])
      .range(['#ff4d4f', '#69c0ff', '#faad14', '#fadb14', '#95de64', '#9254de']);

    const getPosition = scaleOrdinal()
      .domain(['Black', 'White', 'Asian', 'Hispanic', 'Native', 'Other'])
      .range([-100, -60, -20, 20, 60, 100]);

    const data_ready = pie(array)

    return <svg>
        <text style={{ textAnchor:'middle'}} transform={`translate(${200}, ${50})`}>
                    {'National level situation'}
                </text>
        {data_ready.map((d) => {
            return <g key={d.data.label} transform={`translate(${height/2}, ${width/2})`}>
            <path d={arc(d)} fill={colorScale(d.data.label)} />
            {/* <text style={{ textAnchor:'middle', alignmentBaseline:'middle' }} transform={`translate(${arc.centroid(d)[0]}, ${arc.centroid(d)[1]})`}>
                    {d.data.percentage}
                </text> */}
            <rect x={175} y={getPosition(d.data.label)-20} height={30} width={40} fill={colorScale(d.data.label)}/>
            <text style={{ textAnchor:'start'}} transform={`translate(${220}, ${getPosition(d.data.label)})`}>
                    {d.data.label}
                </text>
            </g>
        })}
    </svg>
}


function PieChart_state_ethnicity(props) {
    const { data, height, width, selectedState } = props;

    if (!selectedState) {
        return <g>
            <text style={{ textAnchor:'middle'}} transform={`translate(${height/2}, ${width/2})`}>
                    {'Hover over a state'}
                </text>
        </g>;
    } else {

    var black = data[0].Black
    var white = data[0].White
    var asian = data[0].Asian
    var hispanic = data[0].Hispanic
    var other = data[0].Other
    var native = data[0].Native
    var total = black+white+asian+hispanic+other+native

    var black_percentage = Number(black/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var white_percentage = Number(white/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var asian_percentage = Number(asian/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var hispanic_percentage = Number(hispanic/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var other_percentage = Number(other/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
    var native_percentage = Number(native/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});

    const array = [{label:'Black',value:black,percentage:black_percentage}, {label:'White',value:white,percentage:white_percentage},
                {label:'Asian',value:asian,percentage:asian_percentage}, {label:'Hispanic',value:hispanic,percentage:hispanic_percentage}, 
                {label:'Native',value:native,percentage:native_percentage}, {label:'Other',value:other,percentage:other_percentage}]

    var no_case = array.filter(function(el) { return el.value == 0; });
    var no_case_ethnicity = [];
    for ( let item of no_case){
        no_case_ethnicity.push(' '+item.label)
    }
    function process(no_case_ethnicity){
        if (no_case_ethnicity.length != 0){return `No case for${no_case_ethnicity}`}
        else {return ''}
    }
    const note = process(no_case_ethnicity)

    const pie = d3
      .pie()
      .value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(140);

    const colorScale = scaleOrdinal()           
      .domain(['Black', 'White', 'Asian', 'Hispanic', 'Native', 'Other'])
      .range(['#ff4d4f', '#69c0ff', '#faad14', '#fadb14', '#95de64', '#9254de']);

    const getPosition = scaleOrdinal()
      .domain(['Black', 'White', 'Asian', 'Hispanic', 'Native', 'Other'])
      .range([-100, -60, -20, 20, 60, 100]);

    const data_ready = pie(array)

    const test = ['Black', 'White']

    return <svg>
        <text style={{ textAnchor:'middle'}} transform={`translate(${200}, ${50})`}>
                    {`Situation in ${selectedState}`}
                </text>
        {data_ready.map((d) => {
            return <g key={d.data.label} transform={`translate(${height/2}, ${width/2})`}>
            <path d={arc(d)} fill={colorScale(d.data.label)} />
            {/* <text style={{ textAnchor:'middle', alignmentBaseline:'middle' }} transform={`translate(${arc.centroid(d)[0]}, ${arc.centroid(d)[1]})`}>
                    {d.data.percentage}
                </text> */}
            <text style={{ textAnchor:'middle'}} transform={`translate(${0}, ${width/2-30})`}>
                    {`${note}`}
                </text>
            </g>
        })}
    </svg>
}}



function BarChart_national_unarmed(props) {
    const { data, height, width } = props;

    const xScale = scaleBand().range([0, width]).domain(data.map(d => d.ethnicity));
    const yScale = scaleLinear().range([height, 0]).domain([0, max(data, d => d.percentage)]).nice();


    return <g transform={`translate(${0}, ${70})`}>
        <text style={{ textAnchor:'middle'}} transform={`translate(${width/2}, ${-50})`}>
                    {'National level situation'}
                </text>
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${0}, ${-10})`}>
                {"Percentage of unarmed shootings"}
        </text>
        {/* start your code here */}
        {/* Xaxis */}
        {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.domain().map(tickValue =>
                <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'middle', fontSize:'12px' }} x={30} y={height+12}>
                        {tickValue}
                    </text>
                </g>
            )}

        {/* Yaxis */}
        <g>
        {<line y2={height} stroke='black'/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {Number(tickValue).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})}
                </text>
            </g>
            )}
        </g>

        {/* Bars */}
        <g>
        { data.map( d => <g key={d.ethnicity}>
        <rect x={xScale(d.ethnicity)+15} y={yScale(d.percentage)}
        width={xScale.bandwidth()/2} height={height-yScale(d.percentage)} stroke="black" 
        fill='#ff4d4f'/>
        <text style={{ textAnchor:'start', fontSize:'10px' }} transform={`translate(${xScale(d.ethnicity)+17}, ${yScale(d.percentage)-5})`}>
                    {Number(d.percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})}
                </text>
        </g>
        ) }
        </g>
    </g>
}


function BarChart_state_unarmed(props) {
    const { raw_data, height, width, selectedState, national_data } = props;

    if (!selectedState) {
        return <g>
            <text style={{ textAnchor:'middle'}} transform={`translate(${width/2}, ${height/2})`}>
                    {'Hover over a state'}
                </text>
        </g>;
    } else {

    function delete_NaN(value){
        if (isNaN(value)){return false}
        else {return true}
    }
    var data = raw_data.filter(function(el) { return delete_NaN(el.percentage); });
    var no_case = raw_data.filter(function(el) { return isNaN(el.percentage); });
    var no_case_ethnicity = [];
    for ( let item of no_case){
        no_case_ethnicity.push(' '+item.ethnicity)
    }
    console.log(no_case_ethnicity.length)
    function process(no_case_ethnicity){
        if (no_case_ethnicity.length != 0){return `No case for${no_case_ethnicity}`}
        else {return ''}
    }
    const note = process(no_case_ethnicity)

    const xScale = scaleBand().range([0, width]).domain(data.map(d => d.ethnicity));
    const yScale = scaleLinear().range([height, 0]).domain([0, 1]).nice();


    return <g transform={`translate(${0}, ${70})`}>
        <text style={{ textAnchor:'middle'}} transform={`translate(${width/2}, ${-50})`}>
                    {`Situation in ${selectedState}`}
                </text>
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${0}, ${-10})`}>
                {"Percentage of unarmed shootings"}
        </text>
        {/* start your code here */}
        {/* Xaxis */}
        {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.domain().map(tickValue =>
                <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'middle', fontSize:'12px' }} x={30} y={height+12}>
                        {tickValue}
                    </text>
                </g>
            )}

        {/* Yaxis */}
        <g>
        {<line y2={height} stroke='black'/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {Number(tickValue).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})}
                </text>
            </g>
            )}
        </g>

        {/* Bars */}
        <g>
        { data.map( d => <g key={d.ethnicity}>
        <rect x={xScale(d.ethnicity)+15} y={yScale(d.percentage)}
        width={width/12} height={height-yScale(d.percentage)} stroke="black" 
        fill='#ff4d4f'/>
        <text style={{ textAnchor:'start', fontSize:'10px' }} transform={`translate(${xScale(d.ethnicity)+17}, ${yScale(d.percentage)-5})`}>
                    {Number(d.percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})}
                </text>
        </g>
        ) }
        </g>

        {/* Note */}
        <text style={{ textAnchor:'middle'}} transform={`translate(${width/2}, ${height+40})`}>
                    {`${note}`}
                </text>
    </g>
}}


function View4_national(props) {
    const { Attr, ethnicity_data, recorded_data, unarmed_data, height, width } = props;
    if (Attr === 'recorded') {
        return <g>
            <PieChart_national_recorded data={recorded_data} height={height} width={width}/>
        </g>
    }
    else if (Attr === 'ethnicity'){
        return <g>
            <PieChart_national_ethnicity data={ethnicity_data} height={height} width={width}/>
        </g>
    }
    else {
        return <g>
            <BarChart_national_unarmed data={unarmed_data} height={height-100} width={width-50}/>
        </g>
    }
}


function View4_state(props) {
    const { Attr, ethnicity_data, recorded_data, unarmed_data, national_data, height, width, selectedState } = props;
    if (Attr === 'recorded') {
        return <g>
            <PieChart_state_recorded data={recorded_data} height={height} width={width} selectedState={selectedState}/>
        </g>
    }
    else if (Attr === 'ethnicity'){
        return <g>
            <PieChart_state_ethnicity data={ethnicity_data} height={height} width={width} selectedState={selectedState}/>
        </g>
    }
    else {
        return <g>
            <BarChart_state_unarmed raw_data={unarmed_data} height={height-100} width={width-50} selectedState={selectedState} national_data={national_data}/>
        </g>
    }
}


export { View4_national, View4_state }

