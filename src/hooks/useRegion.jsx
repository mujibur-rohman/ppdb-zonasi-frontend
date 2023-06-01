import axios from "axios";
import React, { useEffect, useState } from "react";

const useRegion = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState();
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [subDistrict, setSubDistrict] = useState([]);

  //   Get Province
  const getProvinsi = async () => {
    await axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((prov) => setProvinsi(prov.data?.provinsi))
      .catch((err) => console.log(err));
  };
  //   Get City
  const getCity = async () => {
    if (selectedProvinsi) {
      const splitProv = selectedProvinsi.split(" ");
      await axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${splitProv[0]}`
        )
        .then((prov) => setCity(prov.data?.kota_kabupaten))
        .catch((err) => console.log(err));
    }
  };
  //   Get Kecamatan
  const getDistrict = async () => {
    if (selectedCity) {
      const splitCity = selectedCity.split(" ");
      await axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${splitCity[0]}`
        )
        .then((prov) => setDistrict(prov.data?.kecamatan))
        .catch((err) => console.log(err));
    }
  };
  //   Get Kelurahan
  const getSubDistrict = async () => {
    if (selectedDistrict) {
      const splitDist = selectedDistrict.split(" ");
      await axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${splitDist[0]}`
        )
        .then((prov) => setSubDistrict(prov.data?.kelurahan))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getProvinsi();
    getCity();
    getDistrict();
    getSubDistrict();
  }, [selectedProvinsi, selectedCity, selectedDistrict]);
  return {
    provinsi,
    setSelectedProvinsi,
    city,
    setSelectedCity,
    district,
    setSelectedDistrict,
    subDistrict,
  };
};

export default useRegion;
