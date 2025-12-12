import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import { useMediaQuery } from '@mui/material';

import "./Map.css";

const markers = [
  {
    id: 1,
    name: "Mirpur 12, Dhaka-1216, Bangladesh",
    position: { lat: 23.834722, lng: 90.365833 },
  }
];

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Fragment>
      <div className="mapbox">
        {/* <div className="area" style={{ height: "100vh", width: "37vw" }}> */}
        <div className="area" style={{ height: isMobile ? '30vh' : '100vh', width: isMobile ? '96vw' : '37vw' }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: 23.834722, lng: 90.365833 }}
              zoom={15}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                // icon={{
                //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                //   scaledSize: { width: 50, height: 50 }
                // }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "18px", margin: 0 }}>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Map;
