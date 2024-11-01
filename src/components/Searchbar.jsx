import React from "react";
import { useRef, useState, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export default function SearchBar({ onPlaceSelected, name }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelected(placeAutocomplete.getPlace());
    });
   
  }, [onPlaceSelected, placeAutocomplete]);

  return (
    <input
      ref={inputRef}
      className="w-full font-sans"
      type="text"
      placeholder={name}
      style={{
        boxSizing: "border-box",
        border: "px solid transparent",
        padding: "0 12px",
        borderRadius: "3px",
        fontSize: "16px",
        textOverflow: "ellipsis",
      }}
    />
  );
}
