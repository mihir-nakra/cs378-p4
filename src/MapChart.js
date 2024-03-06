import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const MapChart = ({ onClick, birdObj }) => {
  return (
    <ComposableMap 
    >
    {/* <ZoomableGroup center={[0, 0]}> */}
      <Geographies geography="/cs378-p4/features.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography onClick={() => 
                onClick(geo['properties']['name'])} 
                key={geo.rsmKey} 
                geography={geo} 
                stroke="#FFF"
                strokeWidth={.5}
                
                style={{
                    default: { fill: "#000" },
                    hover: { fill: "#9a9c97" },
                    pressed: { fill: "#FFF" },
                }}
                />
            );
          })
        }
      </Geographies>
      {birdObj && birdObj['lng'] != null ? <Marker coordinates={[birdObj['lng'], birdObj['lat']]}>
        <circle r={5} fill="#F53" />
      </Marker> : <div></div>}
      {/* </ZoomableGroup> */}
    </ComposableMap>
  );
};

export default MapChart;
