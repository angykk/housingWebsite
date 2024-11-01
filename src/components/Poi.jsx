import React from "react";
import { Spots } from "./Spots";
import { Apartment } from "./Apartment";
import { VegetarianFoodIcon } from "hugeicons-react";

export default function Poi({}) {
  return (
    <div>
      <div className="bg-white rounded-lg px-2 w-full sm:w-fit">
        Housing Search:
      </div>
      <div>
        <Apartment />
      </div>
      <div>
        <Spots icon={VegetarianFoodIcon} name="Search for grocery stores" />
      </div>
    </div>
  );
}
