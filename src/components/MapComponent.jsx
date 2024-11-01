import React from "react";
import { useData } from "./DataProvider";
import { Map, Marker } from "@vis.gl/react-google-maps";

export default function MapComponent({}) {
  const { center, selectedPlace, points } = useData();

  return (
    <div>
      <Map
        mapId="715f15434f5898cb"
        defaultZoom={13}
        center={center}
        className="w-full h-[20rem] lg:h-[42rem] rounded-lg"
      >
        <Marker
          position={{
            lat: selectedPlace.location.lat,
            lng: selectedPlace.location.lng,
          }}
        />
        {console.log(points.length)}
        {points.map((element) => {
          console.log(element);
          return (<Marker
            key={`${element.location.lat},${element.location.lng}`}
            position={{
              lat: element.location.lat,
              lng: element.location.lng, 
            }}
          />);
        })
        }
      </Map>
    </div>
  );
}
