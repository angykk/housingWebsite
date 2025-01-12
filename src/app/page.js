"use client";
import MapComponent from "@/components/MapComponent";
import Poi from "@/components/Poi";
import { DataProvider } from "@/components/DataProvider";
import { APIProvider, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function Home() {
  const apiIsLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!apiIsLoaded) return;

    // when the maps library is loaded, apiIsLoaded will be true and the API can be
    // accessed using the global `google.maps` namespace.
  }, [apiIsLoaded]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <APIProvider
        libraries={["places"]}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        version="beta"
      >
        {console.log(typeof google)}
        <DataProvider>
          <div className="col-span-2 mx-2 lg:col-span-4 lg:mx-5 lg:my-auto px-5 py-5 rounded-lg mt-2 bg-[#D6EFD8] font-bold">
            <Poi />
          </div>
          <div className="col-span-2 mx-2 lg:col-span-8 lg:mr-5 my-5 px-5 py-5 rounded-lg bg-[#D6EFD8]">
            <MapComponent />
          </div>
        </DataProvider>
      </APIProvider>
    </div>
  );
}
