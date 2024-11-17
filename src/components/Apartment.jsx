import React from "react";
import { House01Icon } from "hugeicons-react";
import Searchbar from "@/components/Searchbar";
import { useData } from "./DataProvider";

export const Apartment = ({}) => {
  const { setCenter } = useData();
  const { setSelectedPlace } = useData();

  const handlePlaceSelected = (place) => {
    if (place.geometry && place.geometry.location) {
      console.log(place);
      setSelectedPlace({
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      });
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center font-normal my-5 rounded-lg px-2 py-2 bg-white w-full">
        <House01Icon className="mr-2" size={30}></House01Icon>
        <div className="flex-1">
          <Searchbar
            apartment={true}
            name="Search for apartments"
            onPlaceSelected={handlePlaceSelected}
          />
        </div>
      </div>
    </div>
  );
};
