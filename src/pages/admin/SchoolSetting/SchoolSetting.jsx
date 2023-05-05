import { Button, Group, Input, Select, Text, Textarea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useRegion from "../../../hooks/useRegion";
import Maps from "../components/Maps";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useFormik } from "formik";
import { MdDeleteOutline } from "react-icons/md";

const SchoolSetting = () => {
  const [blobLogo, setBlobLogo] = useState("");
  const [geo, setGeo] = useState({});
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  // Select Daerah
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

  // Form Handle

  const formik = useFormik({
    initialValues: {
      logo: "",
      schoolName: "",
      address: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      kodePos: "",
      npsn: "",
      latitude: "",
      longitude: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  console.log(blobLogo);
  return (
    <section className="w-full min-h-screen flex md:px-2 md:pb-10 justify-center bg-white">
      <form
        onSubmit={formik.handleSubmit}
        className="md:mt-10 p-5 w-full md:w-5/6 lg:w-4/6 bg-white shadow-lg border-[1px] md:rounded-md"
      >
        <p className="font-medium text-center text-2xl md:text-3xl">
          Profil Sekolah
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-3">
          <Input.Wrapper withAsterisk id="name" label="Nama Sekolah">
            <Input
              name="schoolName"
              onChange={formik.handleChange}
              value={formik.values.schoolName}
              placeholder="Nama"
            />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk id="npsn" label="NPSN">
            <Input
              onChange={formik.handleChange}
              value={formik.values.npsn}
              name="npsn"
              placeholder="NPSN"
            />
          </Input.Wrapper>
          <Select
            withAsterisk
            value={formik.values.provinsi}
            className="w-full border-red-200"
            label="Provinsi"
            placeholder="Provinsi"
            data={optionProvinsi}
            searchable
            onChange={(e) => {
              formik.setFieldValue("provinsi", e);
              setSelectedProvinsi(e);
            }}
          />
          <Select
            withAsterisk
            value={formik.values.kota}
            className="w-full border-red-200"
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            searchable
            data={optionCity}
            onChange={(e) => {
              formik.setFieldValue("kota", e);
              setSelectedCity(e);
            }}
          />
          <Select
            withAsterisk
            value={formik.values.kecamatan}
            className="w-full border-red-200"
            label="Kecamatan"
            placeholder="Kecamatan"
            searchable
            data={optionDistrict}
            onChange={(e) => {
              formik.setFieldValue("kecamatan", e);
              setSelectedDistrict(e);
            }}
          />
          <Select
            value={formik.values.kelurahan}
            withAsterisk
            className="w-full border-red-200"
            label="Kelurahan"
            placeholder="Kelurahan"
            searchable
            onChange={(e) => {
              formik.setFieldValue("kelurahan", e);
            }}
            data={optionSubDistrict}
          />
          <Textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Alamat Lengkap"
            label="Alamat Lengkap"
            withAsterisk
          />
          <Input.Wrapper label="Kode Pos" withAsterisk>
            <Input
              name="kodePos"
              placeholder="Kode Pos"
              value={formik.values.kodePos}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>
        </div>
        <Input.Wrapper
          label="Logo"
          description={!blobLogo && "Klik atau drag gambar dibawah ini"}
          className="mt-3"
          withAsterisk
        >
          {blobLogo ? (
            <div className="flex flex-col justify-center items-center gap-3 my-2">
              <img src={blobLogo} alt="logo" className="w-20" />
              <Button
                onClick={() => {
                  setBlobLogo("");
                  formik.setFieldValue("logo", "");
                }}
                variant="outline"
                color="red"
              >
                <MdDeleteOutline className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Dropzone
              onDrop={(files) => {
                formik.setFieldValue("logo", files[0]);
                setBlobLogo(URL.createObjectURL(files[0]));
              }}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5242900}
              accept={IMAGE_MIME_TYPE}
              className="mt-2"
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: "10rem", pointerEvents: "none" }}
              >
                <div className="text-center">
                  <Text size="xl" inline>
                    Drag gambar disini atau klik
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Maksimal ukuran gambar 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}
        </Input.Wrapper>
        <Input.Wrapper
          label="Lokasi Sekolah"
          description="Klik peta untuk membuat lokasi sekolah"
          className="my-3"
          withAsterisk
        >
          <Maps
            onLoad={(map) => setMap(map)}
            onClickMap={(e) => {
              formik.setFieldValue("latitude", e.latLng.lat());
              formik.setFieldValue("longitude", e.latLng.lng());
            }}
            onClickPin={() => {
              map.panTo(geo);
              formik.setFieldValue("latitude", geo.lat);
              formik.setFieldValue("longitude", geo.lng);
            }}
            geo={geo}
            markerVal={{
              lat: formik.values.latitude || 0,
              lng: formik.values.longitude || 0,
            }}
          />
        </Input.Wrapper>
        <Button
          className="mt-3 w-full py-2"
          disabled={formik.isSubmitting}
          type="secondary"
        >
          {formik.isSubmitting ? "Loading.." : "Buat"}
        </Button>
      </form>
    </section>
  );
};

export default SchoolSetting;
