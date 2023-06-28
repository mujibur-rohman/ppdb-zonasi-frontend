import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  OverlayViewF,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../../constants/apikey";
import { Skeleton } from "@mantine/core";
import { MdLocationPin } from "react-icons/md";
import { BASE_URL_API } from "../../../constants/baseUrlAPI";

const Maps = ({
  onLoad,
  onClickMap,
  onClickPin,
  geo,
  markerVal,
  markerArray,
  iconUrl,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Skeleton height={50} radius="md" my="md" />;
  return (
    <>
      <GoogleMap
        clickableIcons
        onClick={onClickMap}
        center={geo}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
        onLoad={onLoad}
      >
        {markerVal ? (
          <MarkerF
            position={markerVal}
            icon={`${BASE_URL_API}/icon/pin-black.png`}
          />
        ) : null}
        {markerArray
          ? markerArray.map((item, i) => (
              <MarkerF key={i} position={item.geo} icon={item.icon} />
            ))
          : null}
      </GoogleMap>
      <div
        onClick={onClickPin}
        className="absolute cursor-pointer bottom-2 right-2 bg-white rounded p-1"
      >
        <MdLocationPin className="w-5 h-5 text-red-500" />
      </div>
    </>
  );
};

export default Maps;
