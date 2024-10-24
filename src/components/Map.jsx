import React from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';
import Searchbar from "@/components/Searchbar";


export const Map = () => {
    const center = useMemo(()=>({lat:44, lng:-80}), []);
  return (
 <div 
  className="grid grid-cols-1 lg:grid-cols-12">
    <div className="col-span-2 mx-1 lg:col-span-4 lg:mx-5 lg:my-auto px-5 py-5 rounded-lg mt-2 bg-[#D6EFD8] font-bold">
      Points of interest:
    </div>
   <div 
    className = "col-span-2 mx-2 lg:col-span-8 lg:mr-5 my-5 px-5 py-5 rounded-lg bg-[#D6EFD8]">
      <Searchbar />
     <GoogleMap zoom={10} center={center} mapContainerClassName='w-full h-screen lg:h-60% lg:w-full rounded-lg'>
          <MarkerF position={center} />
      </GoogleMap>
   </div>
  </div>
  )
}

export default Map;
