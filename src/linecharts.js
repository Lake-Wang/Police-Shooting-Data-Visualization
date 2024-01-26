import React from "react";
import * as d3 from "d3";

export {MultipleLineChart};

function MultipleLineChart(props){
    const {x, y, width, height, data, year, setYear} = props;
        const years = data.map(d=> d.year); 
        const xScale = d3.scaleBand().range([0, width]).domain(years);
        const max_value = d3.max([d3.max(data, d => d.total_case), d3.max(data, d => d.unarmed_case)]);
        const yScale = d3.scaleLinear().range([height, 0]).domain([0, max_value]).nice();
        const total_case = data.filter( d => d.year).map(d => { return {year: d.year, value: d.total_case} })
        .sort((a, b) => years.indexOf(a.year)-years.indexOf(b.year));
        const unarmed_case = data.filter( d => d.year).map(d => { return {year: d.year, value: d.unarmed_case} })
        .sort((a, b) => years.indexOf(a.year)-years.indexOf(b.year));

        const line = d3.area()
        .x(d => xScale(d.year))
        .y0(height)
        .y1(d => yScale(d.value))
        ;

        const getColor = (d) => {
            return d.year === years[year] ? "red" : "#99d594";
        };

        const getSize = (d) => {
            return d.year === years[year] ? 8 : 5;
        };

        const MouseEnter = (d) => {
            setYear(years.indexOf(d.year));
        };
        const MouseOut = () => {
            setYear(year);
        };

        const xTicks = xScale.domain();
        const yTicks = yScale.ticks();
        // console.log(data.filter( d => d.date.slice(-2) === "14").map(d => {d.date = d.date.slice(0, 3); return d})
        //     .sort((a, b) => weekdays.indexOf(a.date)-weekdays.indexOf(b.date)));
        


        // const week2 = data.filter( d => d.date.slice(-2) === "14").map(d => {d.date = d.date.slice(0, 3); return d})
        //         .sort((a, b) => weekdays.indexOf(a.date)-weekdays.indexOf(b.date));
        // const week3 = data.filter( d => d.date.slice(-2) === "15").map(d => {d.date = d.date.slice(0, 3); return d})
        //         .sort((a, b) => weekdays.indexOf(a.date)-weekdays.indexOf(b.date));
        // const week4 = data.filter( d => d.date.slice(-2) === "16").map(d => {d.date = d.date.slice(0, 3); return d})
        //         .sort((a, b) => weekdays.indexOf(a.date)-weekdays.indexOf(b.date));
        // const week5 = data.filter( d => d.date.slice(-2) === "17").map(d => {d.date = d.date.slice(0, 3); return d})
        //         .sort((a, b) => weekdays.indexOf(a.date)-weekdays.indexOf(b.date));
        // console.log(week1.slice(-1));
        return <g transform={`translate(${x},${y})`}>
            <line y2={height} stroke={`black`} />
            {yTicks.map( tickValue => {
                return <g key={tickValue} transform={`translate(${-10}, ${yScale(tickValue)})`}>
                        <line x2={width} stroke={"gray"} />
                        <text style={{ textAnchor:'end', fontSize:'18px' }}>
                        {tickValue}
                        </text>
                    </g> 
            })}
            <text style={{ textAnchor:'start', fontSize:'18px'}} transform={`translate(${10}, ${-30})rotate(${0})`}>
                    {"Number of Police Shootings"}
                </text>
            <line x1={0} y1={height} x2={width} y2={height} stroke={`black`} />
            {xTicks.map( tickValue => {
                return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                        <line y2={5} stroke={"black"} />
                        <text style={{ textAnchor:'middle', fontSize:'18px'}} y={20}>
                        {tickValue}
                        </text>
                </g> 
            })}
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${width}, ${height-10})`}>
                            {"Year"}
                </text>
            <path d={line(total_case)} stroke={"black"} strokeWidth={1.5} fill={"steelblue"} opacity={0.6} />
            <path d={line(unarmed_case)} stroke={"black"} strokeWidth={1.5} fill={"pink"} opacity={0.8} />

            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(total_case.slice(-1)[0].year)+60}, ${yScale(total_case.slice(-1)[0].value)-20})`}>
                            {"Total Cases"}
                </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(unarmed_case.slice(-1)[0].year)+60}, ${yScale(unarmed_case.slice(-1)[0].value)-20})`}>
                            {"Cases of Unarmed Victims"}
                </text>


            {data.map((d) => {
                return <circle key={d.year} cx={xScale(d.year)} cy={yScale(d.total_case)} r={getSize(d)}
                fill={getColor(d)} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut} />
            })}

            {data.map((d) => {
                return <circle key={d.year} cx={xScale(d.year)} cy={yScale(d.unarmed_case)} r={getSize(d)}
                fill={getColor(d)} stroke={'black'} onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut} />
            })}

            {/*  */}


            {/* 
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(Asian.slice(-1)[0].year)+60}, ${yScale(Hispanic.slice(-1)[0].value)+10})`}>
                            {"Hispanic"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(Asian.slice(-1)[0].year)+60}, ${yScale(Native.slice(-1)[0].value)+10})`}>
                            {"Native"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(Asian.slice(-1)[0].year)+60}, ${yScale(White.slice(-1)[0].value)+10})`}>
                            {"White"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(Asian.slice(-1)[0].year)+60}, ${yScale(Other.slice(-1)[0].value)+10})`}>
                            {"Other"}
            </text>
             */}

            </g>

}