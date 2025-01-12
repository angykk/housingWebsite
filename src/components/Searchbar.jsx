import React from "react";
import { useRef, useState, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Delete01Icon } from "hugeicons-react";
import { useData } from "./DataProvider";

export default function SearchBar({
  apartment,
  onPlaceSelected,
  name,
  type,
  index,
}) {
  const { center, points, removePoint } = useData();
  const { addNearBy, clearNearBy } = useData();
  const { whichSearch, setWhichSearch } = useData();

  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [placeInput, setPlaceInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  const handleClearSelection = () => {
    console.log("Clearing selection for index:", index);
    console.log("Current points:", points);
    console.log("Point to remove:", points[index]);

    setPlaceInput(false);
    inputRef.current.value = "";
    setDisabled(false);
    removePoint(points[index]);
  };

  useEffect(() => {
    if (apartment) {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }
  }, [places, apartment]);

  useEffect(() => {
    if (apartment) {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelected(placeAutocomplete.getPlace());
        setPlaceInput(true);
      });
    }
  }, [apartment, onPlaceSelected, placeAutocomplete, placeInput]);

  useEffect(() => {
    if (!apartment && isFocused) {
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          clearNearBy();
          results.forEach((result) => addNearBy(result));
        } else {
          console.log("No results found");
        }
      }
      async function nearBy() {
        const request = {
          fields: ["geometry", "name", "formatted_address", "place_id"],
          location: center,
          radius: 10000,
          type: type,
        };
        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.nearbySearch(request, callback);
      }
      if (places && center) {
        nearBy();
      }
    }
    setWhichSearch(index);
  }, [center, isFocused, type, addNearBy, clearNearBy, index]);

  useEffect(() => {
    if (points[whichSearch] !== undefined && whichSearch === index) {
      console.log(points[whichSearch]);
      console.log(points[whichSearch].name);
      inputRef.current.value = points[whichSearch].name;
      setPlaceInput(true);
      setDisabled(true);
    }
  }, [points, whichSearch]);

  return (
    <div className="flex w-full">
      <input
        ref={inputRef}
        className="w-[90%] font-sans"
        type="text"
        readOnly={placeInput && !apartment}
        placeholder={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        style={{
          boxSizing: "border-box",
          padding: "0 12px",
          borderRadius: "3px",
          fontSize: "16px",
          textOverflow: "ellipsis",
        }}
      />
      {placeInput && !apartment && (
        <button className="justify-items-end" onClick={handleClearSelection}>
          <Delete01Icon size={15} />
        </button>
      )}
    </div>
  );
}
