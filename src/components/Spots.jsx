import React from "react";
import Searchbar from "@/components/Searchbar";
import { useData } from "./DataProvider";

export const Spots = ({ name, icon: Icon }) => {
  const { addPoints } = useData();

  const handlePoints = (place) => {
    addPoints(place);
  };

  return (
    <div>
      <div className="flex flex-row items-center font-normal mt-5 rounded-lg px-2 py-2 bg-white w-full">
        <Icon className="mr-2" size={30}></Icon>
        <div className="flex-1">
          <Searchbar name={name} onPlaceSelected={handlePoints} />
        </div>
      </div>
    </div>
  );
};
