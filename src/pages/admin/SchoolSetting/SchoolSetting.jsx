import { Input, Select } from "@mantine/core";
import React from "react";
import useRegion from "../../../hooks/useRegion";
import Maps from "../components/Maps";

const SchoolSetting = () => {
  const {
    provinsi,
    setSelectedProvinsi,
    city,
    setSelectedCity,
    district,
    setSelectedDistrict,
    subDistrict,
  } = useRegion();

  const optionProvinsi = provinsi.map((prov) => ({
    label: prov.nama,
    value: `${prov.id} ${prov.nama}`,
  }));
  const optionCity = city.map((cit) => ({
    label: cit.nama,
    value: `${cit.id} ${cit.nama}`,
  }));
  const optionDistrict = district.map((dist) => ({
    label: dist.nama,
    value: `${dist.id} ${dist.nama}`,
  }));
  const optionSubDistrict = subDistrict.map((sd) => ({
    label: sd.nama,
    value: sd.nama,
  }));
  return (
    <section className="w-full min-h-screen flex md:px-2 md:pb-10 justify-center bg-blue-500">
      <div className="md:mt-10 p-5 w-full md:w-5/6 lg:w-4/6 bg-white md:rounded-md">
        <p className="font-medium text-center text-2xl md:text-3xl">
          Profil Sekolah
        </p>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <Input.Wrapper id="name" label="Nama Sekolah">
            <Input id="name" name="schoolName" placeholder="Nama" />
          </Input.Wrapper>
          <Input.Wrapper id="npsn" label="NPSN">
            <Input id="npsn" name="npsn" placeholder="NPSN" />
          </Input.Wrapper>
          <Select
            className="w-full border-red-200"
            label="Provinsi"
            placeholder="Provinsi"
            data={optionProvinsi}
            searchable
            onChange={(e) => {
              setSelectedProvinsi(e);
            }}
          />
          <Select
            className="w-full border-red-200"
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            searchable
            data={optionCity}
            onChange={(e) => {
              setSelectedCity(e);
            }}
          />
          <Select
            className="w-full border-red-200"
            label="Kecamatan"
            placeholder="Kecamatan"
            searchable
            data={optionDistrict}
            onChange={(e) => {
              setSelectedDistrict(e);
            }}
          />
          <Select
            className="w-full border-red-200"
            label="Kelurahan"
            placeholder="Kelurahan"
            searchable
            data={optionSubDistrict}
          />
        </div>
        <div className="h-72 w- mt-3 rounded overflow-hidden border-2 border-gray-200">
          <Maps />
        </div>
      </div>
    </section>
  );
};

export default SchoolSetting;
