import React from "react";

export function Tooltip(props) {
    const {caseData, left, top, selectedState} = props;
    if (left === null) {
        return <g></g>;
    } else {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            width: "150px",
            height: "120px",
            padding: "2px",
            font: "12px sans-serif",
            background: "lightgreen",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: '0px',
            top: '0px'
        };

        console.log(caseData);

        // const number = d.filter(d => (d.state === selectedState));
        // const result = null;
        // if (number === null){
        //     result = "NA";
        // } 
        // else {
        //     result = number.total_case;
        // }
        
        return <foreignObject x={left} y={top} width={200} height={150}>
            <div style={divStyle}>
            <p>Selected State:</p>
            <ul> 
            <li>{selectedState}</li>
            </ul>
            {/* <p>Reported Number:</p>
            <ul> 
            <li>{result}</li>
            </ul> */}
            </div>        
        </foreignObject>
        
    };  
}