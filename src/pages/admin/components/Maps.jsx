import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../../constants/apikey";
import { Skeleton } from "@mantine/core";

const center = { lat: -6.121396, lng: 106.972317 };
const Maps = () => {
  const [geo, setGeo] = useState({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  console.log(geo);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  if (!isLoaded) return <Skeleton height={50} radius="md" my="md" />;
  return (
    <GoogleMap
      center={geo}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    ></GoogleMap>
  );
};

export default Maps;
