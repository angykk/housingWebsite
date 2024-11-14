import React from "react";
import { Spots } from "./Spots";
import { Apartment } from "./Apartment";
import {
  BookEditIcon,
  EquipmentGym03Icon,
  MetroIcon,
  ShoppingBag02Icon,
  VegetarianFoodIcon,
} from "hugeicons-react";

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
        <Spots
          keyword="grocery stores"
          icon={VegetarianFoodIcon}
          name="Search for grocery stores"
          type="supermarket"
          index='0'
        />
      </div>
      <div>
        <Spots
          keyword="gym"
          icon={EquipmentGym03Icon}
          name="Search for gyms"
          type="gym"
          index='1'
         />
      </div>
      <div>
        <Spots
            keyword="subway"
            icon={MetroIcon}
            name="Search for subway stations"
            type="subway_station"
            index='2'
          />
      </div>
      <div>
        <Spots
          keyword="libraries"
          icon={BookEditIcon}
          name="Search for libraries"
          type="library"
          index='3'
        />
      </div>
      <div>
        <Spots
            keyword="shopping mall"
            icon={ShoppingBag02Icon}
            name="Search for malls"
            type="shopping_mall"
            index='4'
          />
      </div>
    </div>
  );
}
