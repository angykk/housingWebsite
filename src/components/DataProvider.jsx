import { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 }); // Default center
  const [selectedPlace, setSelectedPlace] = useState({
    location: { lat: 43.6532, lng: -79.3832 },
  });
  const [points, setPoints] = useState([]);
  const [nearByPoints, setNearByPoints] = useState([]);
  const [whichSearch, setWhichSearch] = useState(null);
  const [setInfoWindowOpen, setSetInfoWindowOpen] = useState(false);

  const addPoints = useCallback((place, index) => {
    setPoints((prevPoints) => {
      const isDuplicate = prevPoints.some((point) => {
        if (point !== undefined) {
          point.location.lat === place.location.lat &&
            point.location.lng === place.location.lng;
        }
      });

      if (!isDuplicate) {
        if (index >= 0) {
          const updatedPoints = [...prevPoints];
          updatedPoints[index] = {
            id: place.id,
            name: place.name,
            location: {
              lat: place.location.lat,
              lng: place.location.lng,
            },
          };

          return updatedPoints;
        }
      }
      return prevPoints;
    });
  }, []);

  const removePoint = useCallback((removePlace) => {
    if (!removePlace) return;
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints];
      prevPoints.map((point, index) => {
        if (!point) return;
        const isSameLocation =
          Math.abs(point.location.lat - removePlace.location.lat) < 0.00001 &&
          Math.abs(point.location.lng - removePlace.location.lng) < 0.00001;
        if (isSameLocation) {
          updatedPoints[index] = undefined;
        }
      });

      console.log(updatedPoints);
      return updatedPoints;
    });
  }, []);

  const addNearBy = useCallback((place) => {
    setNearByPoints((prevNearBy) => {
      const isDuplicate = prevNearBy.some(
        (point) =>
          point.location.lat === place.geometry.location.lat() &&
          point.location.lng === place.geometry.location.lng()
      );
      if (!isDuplicate) {
        return [
          ...prevNearBy,
          {
            name: place.name,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            id: place.place_id,
            rating: place.rating,
          },
        ];
      }
      return prevNearBy;
    });
  }, []);

  const clearNearBy = useCallback(() => {
    setNearByPoints([]);
  }, []);

  return (
    <DataContext.Provider
      value={{
        center,
        setCenter,
        selectedPlace,
        setSelectedPlace,
        points,
        addPoints,
        removePoint,
        nearByPoints,
        setNearByPoints,
        addNearBy,
        clearNearBy,
        whichSearch,
        setWhichSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
