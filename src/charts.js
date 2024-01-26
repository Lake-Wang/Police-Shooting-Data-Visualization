import React from "react";
import { scaleLinear, scaleBand, area, max, curveBasis, min } from "d3";
import * as d3 from 'd3'

function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedState, setSelectedState } = props;
    const helper = [];
    data.forEach(d => {helper.push(d.state)});
    const xScale = scaleBand().range([0, width]).domain(helper);
    const yScale = scaleLinear().range([height, 0]).domain([0, max(data, d => d.total_case)]).nice();
    const ticks = yScale.ticks();
    const getColor = (d) => {
        return d.state === selectedState ? "steelblue" : "#ff4d4f";
    };
    const MouseEnter = (d) => {
        setSelectedState(d.state);
    };
    const MouseOut = () => {
        setSelectedState(null);
    };
    if (selectedState === null) {
        return <g transform={`translate(${offsetX}, ${offsetY})`} >
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/5}, 0)`}>
                    {"Num. of Deaths due to Police Shootings"}
            </text>
            {/* start your code here */}
            {/* x轴 */}
            <g>
            <line x1={0} y1={height} x2={width} y2={height} stroke='black'/>
            {xScale.domain().map(tickValue => {
                return <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'start', fontSize:'10px' }} y={height+3} transform={`rotate(75, 0, ${height+3})`}>
                        {tickValue}
                    </text>
                </g>
        })}
            </g>
            {/* y上半轴 */}
            <g>
        <line y2={height} stroke='black'/>
        {ticks.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px', rotate:'90' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
            {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.state} x={xScale(d.state)} y={yScale(d.total_case)} width={xScale.bandwidth()} height={height - yScale(d.total_case)} 
            fill={'#ff4d4f'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
            
        </g>
} else {
    return <g transform={`translate(${offsetX}, ${offsetY})`} >
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/5}, 0)`}>
                    {"Num. of Deaths due to Police Shootings"}
            </text>
            {/* start your code here */}
            {/* x轴 */}
            <g>
            <line x1={0} y1={height} x2={width} y2={height} stroke='black'/>
            {xScale.domain().map(tickValue => {
                return <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'start', fontSize:'10px' }} y={height+3} transform={`rotate(75, 0, ${height+3})`}>
                        {tickValue}
                    </text>
                </g>
        })}
            </g>
            {/* y上半轴 */}
            <g>
        <line y2={height} stroke='black'/>
        {ticks.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
            {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.state} x={xScale(d.state)} y={yScale(d.total_case)} width={xScale.bandwidth()} height={height - yScale(d.total_case)} 
            fill={'#ff4d4f'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
            {data.filter(d => d.state === selectedState).map((d) => {
            return <rect key={d.state} x={xScale(d.state)} y={yScale(d.total_case)} width={xScale.bandwidth()} height={height- yScale(d.total_case)} 
            fill={getColor(d)} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
        </g>
}
}

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
    const helper = [];
    data.forEach(d => {helper.push(d.station)});
    const xScale = scaleBand().range([0, width]).domain(helper);
    const yScaleUp = scaleLinear().range([height / 2, 0]).domain([0, max(data, d => d.start)]).nice();
    const yScaleDown = scaleLinear().range([0, height / 2]).domain([0, max(data, d => d.end)]).nice();
    const ticksUp = yScaleUp.ticks();
    const ticksDown = yScaleDown.ticks();
    const getColorUp = (d) => {
        return d.station === selectedStation ? "red" : "#99d594";
    };
    const getColorDown = (d) => {
        return d.station === selectedStation ? "steelblue" : "#fc8d59";
    };
    const MouseEnter = (d) => {
        setSelectedStation(d.station);
    };
    const MouseOut = () => {
        setSelectedStation(null);
    };
    if (selectedStation === null) {
        return <g transform={`translate(${offsetX}, ${offsetY})`} >
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                    {"Num. of ridders start from a station"}
            </text>
            {/* start your code here */}
            {/* x轴 */}
            <g>
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke='black'/>
            {xScale.domain().map(tickValue => {
                return <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                </g>
        })}
            </g>
            {/* y上半轴 */}
            <g>
        <line y2={height / 2} stroke='black'/>
        {ticksUp.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleUp(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
            {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.latitude} x={xScale(d.station)} y={yScaleUp(d.start)} width={xScale.bandwidth()} height={height / 2 - yScaleUp(d.start)} 
            fill={'#99d594'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
            

            <g transform={`translate(${0}, ${height/2})`}>
                {/* the text needed is given as the following */}
                <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, ${height/2+10})`}>
                {"Num. of ridders end into a station"}
                </text>
                {/* start your code here */}
                {/* y下半轴 */}
                <g>
        <line y2={height / 2} stroke='black'/>
        {ticksDown.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleDown(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
                {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.longitude} x={xScale(d.station)} y={0} width={xScale.bandwidth()} height={yScaleDown(d.end)} 
            fill={'#fc8d59'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}     
            </g>
        </g>
} else {
    return <g transform={`translate(${offsetX}, ${offsetY})`} >
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                    {"Num. of ridders start from a station"}
            </text>
            {/* start your code here */}
            {/* x轴 */}
            <g>
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke='black'/>
            {xScale.domain().map(tickValue => {
                return <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                </g>
        })}
            </g>
            {/* y上半轴 */}
            <g>
        <line y2={height / 2} stroke='black'/>
        {ticksUp.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleUp(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
            {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.latitude} x={xScale(d.station)} y={yScaleUp(d.start)} width={xScale.bandwidth()} height={height / 2 - yScaleUp(d.start)} 
            fill={'#99d594'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
            {data.filter(d => d.station === selectedStation).map((d) => {
            return <rect key={d.latitude} x={xScale(d.station)} y={yScaleUp(d.start)} width={xScale.bandwidth()} height={height / 2 - yScaleUp(d.start)} 
            fill={getColorUp(d)} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}
            

            <g transform={`translate(${0}, ${height/2})`}>
                {/* the text needed is given as the following */}
                <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, ${height/2+10})`}>
                {"Num. of ridders end into a station"}
                </text>
                {/* start your code here */}
                {/* y下半轴 */}
                <g>
        <line y2={height / 2} stroke='black'/>
        {ticksDown.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleDown(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
})}
    </g>
                {/* 条状图 */}
            {data.map((d) => {
            return <rect key={d.longitude} x={xScale(d.station)} y={0} width={xScale.bandwidth()} height={yScaleDown(d.end)} 
            fill={'#fc8d59'} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
        })}     
            {data.filter(d => d.station === selectedStation).map((d) => {
                return <rect key={d.longitude} x={xScale(d.station)} y={0} width={xScale.bandwidth()} height={yScaleDown(d.end)} 
                fill={getColorDown(d)} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
            })}  
            </g>
        </g>
}
}

function SymmetricAreaChart(props) {
    const { offsetX, offsetY, data, height, width } = props;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const xScale = scaleBand().range([0, width]).domain(MONTH);
    const yScaleUp = scaleLinear().range([height / 2, 0]).domain([0, max(data, d => d.start)]).nice();
    const yScaleDown = scaleLinear().range([0, height / 2]).domain([0, max(data, d => d.end)]).nice();
    const ticksUp = yScaleUp.ticks(3);
    const ticksDown = yScaleDown.ticks(3);
    const p1 = d3.area()
             .x(d => xScale(d.month))
             .y0(height/2)
             .y1(d => yScaleUp(d.start))
             .curve(d3.curveBasis)
              (data);
    const p2 = d3.area()
              .x(d => xScale(d.month))
              .y0(height/2)
              .y1(d => height / 2 + yScaleDown(d.end))
              .curve(d3.curveBasis)
               (data);
 


    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${20})rotate(0)`}>
                {"Start"}
        </text>
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width*2/3}, ${-10})rotate(0)`}>
                {"Num. of riders over the year"}
        </text>
        <g transform={`translate(${offsetX}, ${offsetY+height/2})`}>
            <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${height/2-20})rotate(0)`}>
                {"End"}
        </text>
        </g>
        {/* start your code here */}

        {/* x轴 */}
        <g>
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke='black'/>
            {xScale.domain().map(tickValue => {
                return <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <g transform={`translate(${0}, ${height + 10})`}><line y2={10} stroke='black'/> </g>
                    <g transform={`translate(${0}, ${10})`}><text style={{textAnchor: 'middle', fontSize:'10px' }} y={height+20}> 
                        {tickValue}
                    </text> </g>
            </g>
        })}
            </g>

        {/* y上半轴 */}
        <g>
        <line y2={height / 2} stroke='black'/>
        {ticksUp.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleUp(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
        })}
            </g>

        {/* y下半轴 */}
        <g transform={`translate(${0}, ${height/2})`}>
        <line y2={height / 2} stroke='black'/>
        {ticksDown.map(tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScaleDown(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
        })}
            </g>

        {/* 上半区 */}
        <path d={p1} fill={'lightgreen'} stroke={'black'} />
        <path d={p2} fill={'pink'} stroke={'black'} />

        
    </g>
}


export { SymmetricAreaChart, SymmetricBarChart, BarChart }

