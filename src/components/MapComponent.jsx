import React from "react";
import { useData } from "./DataProvider";
import {
  AdvancedMarker,
  Map,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useRef } from "react";

export default function MapComponent({ }) {
  const {
    center,
    selectedPlace,
    points,
    nearByPoints,
    addPoints,
    clearNearBy,
    whichSearch,
  } = useData();

  const [selectedMarker, setSelectedMarker] = useState({ type: null, index: null });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClicked, setLastClicked] = useState(-1);

  const [placeDetails, setPlaceDetails] = useState(null);

  const markerRefs = useRef([]);
  const markerRefsPoints = useRef([]);

  const handleDoubleClick = (element) => {
    console.log(element);
    addPoints(element, whichSearch);
    setInfoWindowOpen(false);
    clearNearBy();
  };

  const handleMarkerClick = (element, index, markerType) => {
    const currentTime = Date.now();

    if (currentTime - lastClickTime < 4000 && index === lastClicked) {
      handleDoubleClick(element, index);
      return;
    }
    async function getPlaceDetails() {
      const { Place } = await google.maps.importLibrary("places");

      const place = new Place({
        id: element.id,
      });
      await place.fetchFields({
        fields: [
          "displayName",
          "formattedAddress",
          "location",
          "regularOpeningHours",
          "rating",
        ],
      });

      const openingHours = place.regularOpeningHours;
      const today = new Date().getDay();
      const isOpen247 = openingHours?.weekdayDescriptions[today].includes("24");

      setPlaceDetails({
        displayName: place.displayName,
        formattedAddress: place.formattedAddress,
        geometry: { location: place.location },
        regularOpeningHours: openingHours,
        isOpen247: isOpen247,
        rating: place.rating,
      });
      console.log(placeDetails);
    }

    getPlaceDetails();
    setSelectedMarker({ type: markerType, index: index });
    setInfoWindowOpen(true);
    setLastClickTime(currentTime);
    setLastClicked(index);
  };

  const getTodayOpeningHours = () => {
    if (!placeDetails?.regularOpeningHours) return "No hours available";

    const todayIndex = (new Date().getDay()) - 1; // 1 (Sunday) to 7 (Saturday)
    const todayHours = placeDetails.regularOpeningHours.weekdayDescriptions[todayIndex];

    const openingTime = (todayHours) => {
      const colonIndex = todayHours.indexOf(':');

      return todayHours.substring(colonIndex + 1).trim();
    };

    return todayHours
      ? openingTime(todayHours)
      : "Closed today";
  };

  return (
    <div>
      <Map
        mapId="715f15434f5898cb"
        defaultZoom={13}
        center={center}
        className="w-full h-[20rem] lg:h-[42rem] rounded-lg"
        disableDoubleClickZoom="false"
      >
        <AdvancedMarker
          position={{
            lat: selectedPlace.location.lat,
            lng: selectedPlace.location.lng,
          }}
        ></AdvancedMarker>

        {nearByPoints[0] !== null &&
          nearByPoints.map((element, index) => {
            return (
              <div
                key={`${element.location.lat},${element.location.lng},nearby`}
              >
                <AdvancedMarker
                  ref={(el) => {
                    if (el) {
                      markerRefs.current[index] = el;
                    }
                  }}
                  onClick={() => handleMarkerClick(element, index, 'nearby')}
                  position={{
                    lat: element.location.lat,
                    lng: element.location.lng,
                  }}
                >
                  <Pin
                    background={"#98FB98"}
                    borderColor={"#1e89a1"}
                    glyphColor={"#0f677a"}
                  ></Pin>
                </AdvancedMarker>
                {infoWindowOpen && 
                  selectedMarker.type === 'nearby' && 
                  selectedMarker.index === index && (
                  <InfoWindow
                    anchor={markerRefs.current[index]}
                    maxWidth={200}
                    onCloseClick={() => setInfoWindowOpen(false)}
                    headerContent={<p className="font-bold">{element.name}</p>}
                  >
                    <h1>
                      {placeDetails?.isOpen247 ? (
                        <>
                          Open 24 hours <br />
                        </>
                      ) : (
                        <p>Opening Hours: {getTodayOpeningHours()}</p>
                      )}
                      <>{placeDetails?.rating} stars</>
                    </h1>
                  </InfoWindow>
                )}
              </div>
            );
          })}

        {points.map((element, index) => {
          if (element !== undefined) {
            return (
              <div
                key={`${element.location.lat},${element.location.lng},points`}
              >
                <AdvancedMarker
                  ref={(el) => {
                    if (el) {
                      markerRefsPoints.current[index] = el;

                    }
                  }}
                  onClick={() => handleMarkerClick(element, index, 'points')}
                  position={{
                    lat: element.location.lat,
                    lng: element.location.lng,
                  }}
                >
                  <Pin
                    background={"#22ccff"}
                    borderColor={"#1e89a1"}
                    glyphColor={"#0f677a"}
                  ></Pin>
                </AdvancedMarker>
                {infoWindowOpen && 
                  selectedMarker.type === 'points' && 
                  selectedMarker.index === index && (
                  <InfoWindow
                    anchor={markerRefsPoints.current[index]}
                    maxWidth={200}
                    onCloseClick={() => setInfoWindowOpen(false)}
                    headerContent={<p className="font-bold">{element.name}</p>}
                  >
                    <h1>
                      {placeDetails?.isOpen247 ? (
                        <>
                          Open 24 hours <br />
                        </>
                      ) : (
                        <p>Opening Hours: {getTodayOpeningHours()}</p>
                      )}
                      {placeDetails?.rating} stars
                    </h1>
                  </InfoWindow>
                )}
              </div>
            );
          }
          return null;
        })}
      </Map>
    </div>
  );
}
