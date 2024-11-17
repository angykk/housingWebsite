import React from "react";
import Searchbar from "@/components/Searchbar";
import { useData } from "./DataProvider";

export const Spots = ({ keyword, name, icon: Icon, type, index }) => {
  const { addPoints } = useData();
  const { removePoint } = useData();

  const handlePoints = (place) => {
    addPoints(place);
  };
  var clearPlace = (place) => {
    removePoint(place);
  };

  return (
    <div>
      <div className="flex flex-row items-center font-normal rounded-lg px-2 py-2 bg-white w-full">
        <Icon className="mr-2" size={30}></Icon>
        <div className="flex-1">
          <Searchbar
            index={index}
            name={name}
            onPlaceSelected={handlePoints}
            keyword={keyword}
            clearSelection={clearPlace}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};
