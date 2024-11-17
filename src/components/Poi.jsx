import React from "react";
import { Spots } from "./Spots";
import { Apartment } from "./Apartment";
import { useData } from "./DataProvider";
import { useState } from "react";
import { useEffect } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

import {
  Bicycle01Icon,
  BookEditIcon,
  Car01Icon,
  EquipmentGym03Icon,
  LocationUser01Icon,
  MetroIcon,
  ShoppingBag02Icon,
  VegetarianFoodIcon,
} from "hugeicons-react";

export default function Poi({}) {
  const { center, points } = useData();
  const apiIsLoaded = useApiIsLoaded();

  const [walking, setWalking] = useState([Array.apply(points.length).fill("")]);
  const [driving, setDriving] = useState([]);
  const [cycle, setCycle] = useState([]);

  useEffect(() => {
    if (!apiIsLoaded) return;

    const service = new google.maps.DistanceMatrixService();

    const destinationsWithIndex = points.map((element, index) => ({
      index,
      destination: element ? element.location : null,
    }));

    const request1 = {
      origins: [center],
      destinations: destinationsWithIndex.map((item) => {
        if (item === undefined) return undefined;
        return item.destination;
      }),
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    const request2 = {
      origins: [center],
      destinations: destinationsWithIndex.map((item) => {
        if (item === undefined) return undefined;
        return item.destination;
      }),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    const request3 = {
      origins: [center],
      destinations: destinationsWithIndex.map((item) => {
        if (item === undefined) return undefined;
        return item.destination;
      }),
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    service.getDistanceMatrix(request1).then((response) => {
      if (response && response.rows) {
        console.log(response);
        var results = response.rows[0].elements;

        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          if (element && element.duration) {
            const duration = element.duration.text;
            const destinationIndex = destinationsWithIndex[j].index;

            setWalking((prevWalking) => {
              const updatedWalking = [...prevWalking];
              updatedWalking[destinationIndex] = duration;
              return updatedWalking;
            });
          }
        }
      }
    });

    service.getDistanceMatrix(request2).then((response) => {
      if (response && response.rows) {
        console.log(response);
        var results = response.rows[0].elements;

        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          if (element && element.duration) {
            const duration = element.duration.text;
            const destinationIndex = destinationsWithIndex[j].index;

            setDriving((prevDriving) => {
              const updatedDriving = [...prevDriving];
              updatedDriving[destinationIndex] = duration;
              return updatedDriving;
            });
          }
        }
      }
    });

    service.getDistanceMatrix(request3).then((response) => {
      if (response && response.rows) {
        console.log(response);
        var results = response.rows[0].elements;

        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          if (element && element.duration) {
            const duration = element.duration.text;
            const destinationIndex = destinationsWithIndex[j].index;

            setCycle((prevCycle) => {
              const updatedCycle = [...prevCycle];
              updatedCycle[destinationIndex] = duration;
              return updatedCycle;
            });
          }
        }
      }
    });
  }, [apiIsLoaded, center, points]);

  useEffect(() => {
    console.log(walking);
  }, [walking]);

  return (
    <div>
      <div className="bg-white rounded-lg px-2 w-full sm:w-fit font-sans">
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
          index="0"
        />
         <div className="flex place-content-center m-1 font-serif">
          {points[0]&&walking && walking[0].length > 0 &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <LocationUser01Icon size={20} /> {walking[0]}
            </div>
          )}
          {points[0]&&driving && driving[0] && (
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Bicycle01Icon className="mr-1" size={20} /> {driving[0]}
            </div>
          )}
          {points[0]&&cycle && cycle[0] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Car01Icon className="mr-1"size={20} /> {cycle[0]}
            </div>
          )}
        </div>
      </div>
      <div>
       
        <Spots
          keyword="gym"
          icon={EquipmentGym03Icon}
          name="Search for gyms"
          type="gym"
          index="1"
        />
        <div className="flex place-content-center m-1 font-serif">
          {points[1]&&walking && walking[1] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <LocationUser01Icon size={20} /> {walking[1]}
            </div>
          )}
          {points[1]&&driving && driving[1] && (
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Bicycle01Icon className="mr-1"size={20} /> {driving[1]}
            </div>
          )}
          {points[1]&&cycle && cycle[1] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Car01Icon className="mr-1"size={20} /> {cycle[1]}
            </div>
          )}
        </div>
      </div>
      <div>
        <Spots
          keyword="subway"
          icon={MetroIcon}
          name="Search for subway stations"
          type="subway_station"
          index="2"
        />
         <div className="flex place-content-center m-1 font-serif">
          {points[2]&&walking && walking[2] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <LocationUser01Icon size={20} /> {walking[2]}
            </div>
          )}
          {points[2]&&driving && driving[2] && (
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Bicycle01Icon className="mr-1"size={20} /> {driving[2]}
            </div>
          )}
          {points[2]&&cycle && cycle[2] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Car01Icon className="mr-1"size={20} /> {cycle[2]}
            </div>
          )}
        </div>
      </div>
      <div>
       
        <Spots
          keyword="libraries"
          icon={BookEditIcon}
          name="Search for libraries"
          type="library"
          index="3"
        />
         <div className="flex place-content-center m-1 font-serif">
          {points[3] && walking && walking[3] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <LocationUser01Icon size={20} /> {walking[3]}
            </div>
          )}
          {points[3]&&driving && driving[3] && (
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Bicycle01Icon className="mr-1"size={20} /> {driving[3]}
            </div>
          )}
          {points[3]&&cycle && cycle[3] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Car01Icon className="mr-1"size={20} /> {cycle[3]}
            </div>
          )}
        </div>
      </div>
      <div>
      
        <Spots
          keyword="shopping mall"
          icon={ShoppingBag02Icon}
          name="Search for malls"
          type="shopping_mall"
          index="4"
        />
        <div className="flex place-content-center mt-1 font-serif">
          {points[4]&&walking && walking[4] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <LocationUser01Icon size={20} /> {walking[4]}
            </div>
          )}
          {points[4]&&driving && driving[4] && (
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Bicycle01Icon className="mr-1"size={20} /> {driving[4]}
            </div>
          )}
          {points[4]&&cycle && cycle[4] &&(
            <div className="bg-[#80AF81] flex flex-row items-center rounded-lg p-1 w-full sm:w-fit font-medium text-sm mb-4 m-1 text-white">
              <Car01Icon className="mr-1"size={20} /> {cycle[4]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
