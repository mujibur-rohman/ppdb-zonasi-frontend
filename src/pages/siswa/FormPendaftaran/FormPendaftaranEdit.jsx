import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { MdArrowForwardIos, MdCalendarMonth } from "react-icons/md";
import { DateInput } from "@mantine/dates";
import useRegion from "../../../hooks/useRegion";
import { getDistance } from "geolib";
import useSWR from "swr";
import APIJurusan, { jurusanEndPoint } from "../../../api/jurusan.api";
import { AuthProvider } from "../../../context/AuthContext";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { useNavigate } from "react-router-dom";
import SkeletonTable from "../../admin/components/SkeletonTable";
import axios from "axios";

const FormPendaftaranEdit = () => {
  const [geo, setGeo] = useState({});
  const [oldCity, setOldCity] = useState();
  const [oldDistrict, setOldDistrict] = useState();
  const [oldSubDistrict, setOldSubDistrict] = useState();
  const [loadingSetGeo, setLoadingGeo] = useState(false);
  const ctx = useContext(AuthProvider);
  const navigate = useNavigate();
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
  const optionCity =
    city.length === 0
      ? oldCity?.map((cit) => ({
          label: cit.nama,
          value: `${cit.id} ${cit.nama}`,
        }))
      : city?.map((cit) => ({
          label: cit.nama,
          value: `${cit.id} ${cit.nama}`,
        }));
  const optionDistrict =
    district.length === 0
      ? oldDistrict?.map((dist) => ({
          label: dist.nama,
          value: `${dist.id} ${dist.nama}`,
        }))
      : district?.map((dist) => ({
          label: dist.nama,
          value: `${dist.id} ${dist.nama}`,
        }));
  const optionSubDistrict =
    subDistrict.length === 0
      ? oldSubDistrict?.map((sd) => ({
          label: sd.nama,
          value: sd.nama,
        }))
      : subDistrict?.map((sd) => ({
          label: sd.nama,
          value: sd.nama,
        }));
  const optionReligion = [
    { value: "Islam", label: "Islam" },
    { value: "Kristen", label: "Kristen" },
    { value: "Hindu", label: "Hindu" },
    { value: "Budha", label: "Budha" },
    { value: "Katolik", label: "Katolik" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  const { data: jurusan, isLoading } = useSWR(jurusanEndPoint, (url) =>
    APIJurusan.getJurusan(url)
  );
  const jurusanOption = jurusan?.map((jur) => ({
    label: jur.name,
    value: jur.id,
  }));

  const {
    data: pendaftaran,
    isLoading: loadingRegister,
    mutate,
    error,
  } = useSWR(
    `${pendaftaranEndPoint}/${ctx.user.id}/${ctx.periodePendaftaran.id}`,
    (url) => APIPendaftaran.get(url, navigate)
  );

  useEffect(() => {
    const getCity = async () => {
      if (pendaftaran) {
        const splitProv = pendaftaran.provinsi.split(" ");
        await axios
          .get(
            `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${splitProv[0]}`
          )
          .then((prov) => setOldCity(prov.data?.kota_kabupaten))
          .catch((err) => console.log(err));
      }
    };
    const getDistrict = async () => {
      if (pendaftaran) {
        const splitCity = pendaftaran.kota.split(" ");
        await axios
          .get(
            `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${splitCity[0]}`
          )
          .then((prov) => setOldDistrict(prov.data?.kecamatan))
          .catch((err) => console.log(err));
      }
    };
    const getSubDistrict = async () => {
      if (pendaftaran) {
        const splitDist = pendaftaran.kecamatan.split(" ");
        await axios
          .get(
            `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${splitDist[0]}`
          )
          .then((prov) => setOldSubDistrict(prov.data?.kelurahan))
          .catch((err) => console.log(err));
      }
    };
    getCity();
    getDistrict();
    getSubDistrict();
  }, [pendaftaran]);

  const formik = useFormik({
    initialValues: {
      fullName: pendaftaran?.fullName,
      placeBirth: pendaftaran?.placeBirth,
      birthday: pendaftaran?.id ? new Date(pendaftaran?.birthday) : "",
      religion: pendaftaran?.religion,
      gender: pendaftaran?.gender,
      jurusanId: pendaftaran?.jurusanId,
      fromSchool: pendaftaran?.fromSchool,
      nisn: pendaftaran?.nisn,
      address: pendaftaran?.address,
      kelurahan: pendaftaran?.kelurahan,
      kecamatan: pendaftaran?.kecamatan,
      kota: pendaftaran?.kota,
      provinsi: pendaftaran?.provinsi,
      kodePos: pendaftaran?.kodePos,
      jarak: pendaftaran?.jarak,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({
      fullName: yup.string().required("nama lengkap wajib diisi"),
      placeBirth: yup.string().required("tempat lahir wajib diisi"),
      birthday: yup.string().required("tanggal lahir wajib diisi"),
      religion: yup.string().required("agama wajib diisi"),
      gender: yup.string().required("jenis kelamin wajib diisi"),
      jurusanId: yup.string().required("jurusan wajib diisi"),
      fromSchool: yup.string().required("asal sekolah wajib diisi"),
      nisn: yup
        .string()
        .matches(/^-?\d+\.?\d*$/, "NISN bukan bertipe angka")
        .required("NISN harus diisi")
        .trim(),
      address: yup.string().required("alamat lengkap wajib diisi"),
      kelurahan: yup.string().required("kelurahan wajib diisi"),
      kecamatan: yup.string().required("kecamatan wajib diisi"),
      kota: yup.string().required("kota/kabupaten wajib diisi"),
      provinsi: yup.string().required("provinsi wajib diisi"),
      kodePos: yup.string().required("kode pos wajib diisi"),
      jarak: yup.string().required("jarak wajib diisi"),
    }),
    onSubmit: async (values) => {
      await APIPendaftaran.updateData(
        {
          id: pendaftaran?.id,
          userId: ctx.user.id,
          registerPeriodId: ctx.periodePendaftaran.id,
          status: pendaftaran?.status,
          latitude: geo?.lat,
          longitude: geo?.lng,
          ...values,
        },
        navigate,
        pendaftaran.document
      );
      mutate();
    },
  });
  // Hitung jarak
  const countDistance = async () => {
    await navigator.geolocation.getCurrentPosition(async (pos) => {
      setLoadingGeo(true);
      setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      await setTimeout(() => {
        const dist = getDistance(
          {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          {
            latitude: "-6.252006",
            longitude: "106.826969",
          },
          1
        );
        formik.setFieldValue("jarak", `${(dist / 1000).toFixed(2)}`);
        setLoadingGeo(false);
      }, 2000);
    });
  };

  if (loadingRegister) return <SkeletonTable />;

  return (
    <div>
      <form className="bg-white p-5 rounded-md" onSubmit={formik.handleSubmit}>
        <h2 className="text-xl text-center font-medium mb-5">
          Formulir Pendaftaran
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Input.Wrapper
            error={formik.errors.fullName}
            withAsterisk
            id="name"
            label="Nama Lengkap"
          >
            <Input
              error={formik.errors.fullName}
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              placeholder="Nama"
            />
          </Input.Wrapper>
          <Input.Wrapper
            error={formik.errors.placeBirth}
            withAsterisk
            label="Tempat Lahir (Kota)"
          >
            <Input
              error={formik.errors.placeBirth}
              name="placeBirth"
              onChange={formik.handleChange}
              value={formik.values.placeBirth}
              placeholder="Tempat Lahir"
            />
          </Input.Wrapper>
          <DateInput
            withAsterisk
            dateParser={(input) => {
              if (input === "WW2") {
                return new Date(1939, 8, 1);
              }
              return new Date(input);
            }}
            value={formik.values.birthday}
            error={formik.errors.birthday}
            onChange={(val) => formik.setFieldValue("birthday", val)}
            className="w-full"
            valueFormat="DD/MM/YYYY"
            label="Tanggal Lahir"
            placeholder="Tanggal Lahir"
            icon={<MdCalendarMonth />}
          />
          <Select
            withAsterisk
            error={formik.errors.religion}
            value={formik.values.religion}
            className="w-full border-red-200"
            label="Agama"
            placeholder="Agama"
            data={optionReligion}
            searchable
            onChange={(val) => {
              formik.setFieldValue("religion", val);
            }}
          />
          <Select
            withAsterisk
            className="w-full border-red-200"
            label="Jenis Kelamin"
            placeholder="Jenis Kelamin"
            value={formik.values.gender}
            error={formik.errors.gender}
            data={[
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
            onChange={(val) => {
              formik.setFieldValue("gender", val);
            }}
          />
          <Input.Wrapper
            error={formik.errors.fromSchool}
            withAsterisk
            label="Asal Sekolah"
          >
            <Input
              error={formik.errors.fromSchool}
              name="fromSchool"
              onChange={formik.handleChange}
              value={formik.values.fromSchool}
              placeholder="Asal Sekolah"
            />
          </Input.Wrapper>
        </div>
        <div className="flex gap-4 mt-4">
          <Select
            withAsterisk
            error={formik.errors.provinsi}
            value={formik.values.provinsi}
            className="w-full border-red-200"
            label="Provinsi"
            placeholder="Provinsi"
            data={optionProvinsi}
            searchable
            onChange={(e) => {
              formik.setFieldValue("provinsi", e);
              formik.setFieldValue("kota", "");
              formik.setFieldValue("kecamatan", "");
              formik.setFieldValue("kelurahan", "");
              setSelectedProvinsi(e);
            }}
          />
          <Select
            withAsterisk
            value={formik.values.kota}
            error={formik.errors.kota}
            className="w-full border-red-200"
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            searchable
            data={optionCity ? optionCity : [{ label: "", value: "" }]}
            onChange={(e) => {
              formik.setFieldValue("kota", e);
              setSelectedCity(e);
            }}
          />
          <Select
            withAsterisk
            error={formik.errors.kecamatan}
            value={formik.values.kecamatan}
            className="w-full border-red-200"
            label="Kecamatan"
            placeholder="Kecamatan"
            searchable
            data={optionDistrict ? optionDistrict : [{ label: "", value: "" }]}
            onChange={(e) => {
              formik.setFieldValue("kecamatan", e);
              setSelectedDistrict(e);
            }}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <Select
            error={formik.errors.kelurahan}
            value={formik.values.kelurahan}
            withAsterisk
            className="w-full border-red-200"
            label="Kelurahan"
            placeholder="Kelurahan"
            searchable
            onChange={(e) => {
              formik.setFieldValue("kelurahan", e);
            }}
            data={
              optionSubDistrict ? optionSubDistrict : [{ label: "", value: "" }]
            }
          />
          <Input.Wrapper
            error={formik.errors.kodePos}
            label="Kode Pos"
            withAsterisk
          >
            <Input
              error={formik.errors.kodePos}
              name="kodePos"
              placeholder="Kode Pos"
              value={formik.values.kodePos}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>
        </div>
        <Textarea
          className="mt-4"
          name="address"
          error={formik.errors.address}
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Alamat Lengkap"
          label="Alamat Lengkap"
          withAsterisk
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input.Wrapper
            description="NISN harus sesuai dengan data Kemendikbud"
            error={formik.errors.nisn}
            label="NISN"
            withAsterisk
          >
            <Input
              error={formik.errors.nisn}
              name="nisn"
              placeholder="NISN"
              value={formik.values.nisn}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>
          <div className="flex gap-2">
            <Input.Wrapper
              className="w-full"
              error={formik.errors.jarak}
              label="Jarak"
              description="Aktifkan lokasi anda sebelum klik (jarak antara dari rumah ke sekolah)"
              withAsterisk
            >
              <Input
                disabled
                error={formik.errors.jarak}
                name="jarak"
                placeholder="Jarak"
                value={formik.values.jarak}
                onChange={formik.handleChange}
              />
            </Input.Wrapper>
            <Button
              onClick={countDistance}
              variant="outline"
              color="green"
              className="mt-11"
              disabled={loadingSetGeo}
            >
              {loadingSetGeo ? "Loading..." : "Hitung Jarak"}
            </Button>
          </div>
          <Select
            withAsterisk
            error={formik.errors.jurusanId}
            value={formik.values.jurusanId}
            className="w-full border-red-200"
            label="Jurusan Yang Dipilih"
            placeholder="Pilih Jurusan"
            data={isLoading ? [{ label: "", value: "" }] : jurusanOption}
            onChange={(val) => {
              formik.setFieldValue("jurusanId", val);
            }}
          />
        </div>
        <div className="flex mt-5 justify-end">
          <Button type="primary" disabled={formik.isSubmitting}>
            <span className="mr-2">
              {formik.isSubmitting ? "Loading" : "Berikutnya"}
            </span>{" "}
            <MdArrowForwardIos />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPendaftaranEdit;
