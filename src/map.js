import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";
import * as d3 from 'd3';
import { Tooltip } from "./tooltip";

export function Map(props) {
    const {map, data, height, width, colormap, selectedState, setSelectedState} = props;

    console.log(selectedState);
    
    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);
    const [caseData, setCaseData] = React.useState(null);


    const MouseEnter = (d) => {
        setSelectedState(d.state);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY-180);
        console.log(d.total_case);
        setCaseData(d.total_case);
        d3.selectAll('.front').raise();
    };
    const MouseOut = () => {
        setSelectedState(null)
        setTooltipX(null);
        setTooltipY(null);
        setCaseData(null);
    };
    const getColor = (d) => {
        if (d.state === selectedState) {
            return 'steelblue';
        } else {
            return colormap(d.total_case);
        }
    };
    

    const projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
    const path = d3.geoPath(projection.fitSize([width, height], map));

    return <svg width={width} height={height} >
    {map.features.map( feature => {
        const state = data.filter( d => (d.state === feature.properties.NAME));
        if (state[0]){
            return <g>
                <path key={feature.properties.NAME+"boundary"} className={"boundary"} 
                d={path(feature)} style={{fill:getColor(state[0])} } 
                onMouseEnter={() => MouseEnter(state[0])} onMouseOut={() => MouseOut(state[0])}/>
                {/* <Tooltip d={caseData} left={tooltipX} top={tooltipY} selectedState={selectedState} /> */}
            </g> 
            } else {
            return <g>
                <path key={feature.properties.NAME+"boundary"} className={"boundary"} 
                d={path(feature)}/>
                {/* <Tooltip d={caseData} left={tooltipX} top={tooltipY} selectedState={selectedState} /> */}
            </g> } 

        })}
    </svg> 
}