import React, { useEffect, useState } from "react";
import { MapContainer } from "./Map.styles";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
export default function Map(props) {
  let { startLocation } = props;
  let [long, lat] = startLocation.coordinates;
  let [viewPort, setViewPort] = useState({
    lat: 0,
    lng: 0,
    zoom: 0,
    width: "100%",
    height: "400px",
  });
  useEffect(() => {
    setViewPort((preViewPort) => ({
      ...preViewPort,
      lat: lat,
      lng: long,
    }));
  }, [long, lat]);
  let [selectedLocation, setSelectedLocation] = useState(null);

  let renderLocation = props.locations.map((loc) => (
    <Marker
      key={loc.description}
      longitude={loc.coordinates[0]}
      latitude={loc.coordinates[1]}
    >
      <span className="pointer" onClick={() => setSelectedLocation(loc)}></span>
    </Marker>
  ));

  let renderPopup = () => {
    if (selectedLocation) {
      return (
        <Popup
          longitude={selectedLocation.coordinates[0]}
          latitude={selectedLocation.coordinates[1]}
          onClose={() => setSelectedLocation(null)}
        >
          {selectedLocation.description}
        </Popup>
      );
    }
  };

  return (
    <MapContainer>
      <div className="mapWrapper">
        <div className="skewed-wrapper">
          <ReactMapGl
            {...viewPort}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewPort) => setViewPort({ ...viewPort })}
          >
            {renderLocation}
            {renderPopup()}
          </ReactMapGl>
        </div>
      </div>
    </MapContainer>
  );
}
