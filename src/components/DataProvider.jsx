import { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 }); // Default center
  const [selectedPlace, setSelectedPlace] = useState({
    location: { lat: 43.6532, lng: -79.3832 },
  });
  const [points, setPoints] = useState([]);

  const addPoints = useCallback((place) => {
    setPoints((prevPoints) => {
      const isDuplicate = prevPoints.some(
        (point) => 
          point.location.lat === place.geometry.location.lat() &&
          point.location.lng === place.geometry.location.lng()
      );
      if (!isDuplicate) {
        return [...prevPoints,
        {
          name: place.name,
          location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
        },];
      }
      return prevPoints;
      });
}, []);

  const removePoint = useCallback((removePlace) => {
    setPoints((points) =>
      points.filter((place) => place.geometry.location !== removePlace.geometry.location)
    );
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
