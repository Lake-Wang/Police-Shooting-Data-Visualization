import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width, selectedStation, setSelectedStation} = props;
    const projection = geoMercator();
    const path = geoPath(projection.fitSize([width, height], map));
    const MouseEnter = (d) => {
        setSelectedStation(d);
    };
    const MouseOut = () => {
        setSelectedStation(null);
    };
    const getColor = (d) => {
        return d.station === selectedStation.station ? "steelblue" : "red";
    };
    const scaler = scaleLinear().domain([min(data, d => d.popularity), max(data, d => d.popularity)])
    .rangeRound([2, 20])

    if (selectedStation === null) {
        return <g transform={`translate(${offsetX}, ${offsetY})`}>

            {map.features.map( feature => {
                return <path key={feature.properties.name+"boundary"} className={"boundary"} 
                d={path(feature)}/>}
            )}

            {data.map((d) => {
                return <circle key={d.latitude.toString()} cx={projection([d.longitude, d.latitude])[0]} 
                cy={projection([d.longitude, d.latitude])[1]} opacity={0.7} r={scaler(d.popularity)} fill={"red"} stroke={"black"}
                onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
            })}     
        </g>
    
} else {
    return <g transform={`translate(${offsetX}, ${offsetY})`}>

            {map.features.map( feature => {
                return <path key={feature.properties.name+"boundary"} className={"boundary"} 
                d={path(feature)}/>}
            )}

            {data.map((d) => {
                return <circle key={d.latitude.toString()} cx={projection([d.longitude, d.latitude])[0]} 
                cy={projection([d.longitude, d.latitude])[1]} opacity={0.7} r={scaler(d.popularity)} fill={"red"} stroke={"black"}
                onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
            })}

            {data.filter(d => d.station === selectedStation.station).map( d => {
                    return <circle key={d.latitude.toString()} cx={projection([d.longitude, d.latitude])[0]} 
                    cy={projection([d.longitude, d.latitude])[1]} opacity={1} r={scaler(d.popularity)} fill={getColor(d)} stroke={"black"}
                    onMouseEnter={() => MouseEnter(d)} onMouseOut={MouseOut}/>
                })}     
        </g>
}
    }
    