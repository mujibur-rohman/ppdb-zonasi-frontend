import { Button, FileInput } from "@mantine/core";
import React, { useContext } from "react";
import {
  MdArrowForwardIos,
  MdFileUpload,
  MdImage,
  MdUpload,
  MdUploadFile,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { AuthProvider } from "../../../context/AuthContext";
import useSWR from "swr";
import * as yup from "yup";
import { useFormik } from "formik";
import APIDocument from "../../../api/documant.api";

const FormBerkas = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthProvider);
  const { data: pendaftaran, isLoading: loadingRegister } = useSWR(
    `${pendaftaranEndPoint}/${ctx.user.id}/${ctx.periodePendaftaran.id}`,
    (url) => APIPendaftaran.get(url)
  );

  const formik = useFormik({
    initialValues: {
      ijazah: "",
      raport: "",
      photo: "",
      photoWithKord: "",
      akte: "",
      kartuKeluarga: "",
      piagamSertifikat: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      ijazah: yup.string().required("ijazah lengkap wajib diisi"),
      raport: yup.string().required("raport wajib diisi"),
      photo: yup.string().required("photo wajib diisi"),
      photoWithKord: yup.string().required("photo wajib diisi"),
      akte: yup.string().required("akte wajib diisi"),
      kartuKeluarga: yup.string().required("kartu keluarga wajib diisi"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      for (const val in values) {
        formData.append(val, values[val]);
      }
      formData.append("pendaftaranId", pendaftaran.id);
      await APIDocument.addDocument(formData);
      navigate("/");
    },
  });
  return (
    <form className="bg-white p-5 rounded-md" onSubmit={formik.handleSubmit}>
      <h2 className="text-xl text-center font-medium mb-5">
        Berkas Pendaftaran
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <FileInput
          error={formik.errors.photo}
          onChange={(val) => formik.setFieldValue("photo", val)}
          withAsterisk
          label="Foto"
          description="Background merah"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
        <div>
          <FileInput
            error={formik.errors.photoWithKord}
            onChange={(val) => formik.setFieldValue("photoWithKord", val)}
            withAsterisk
            label="Foto Dengan Koordinat"
            description="Ambil foto bebas dengan koordinat menggunakan aplikasi"
            placeholder="Upload Files"
            accept="image/png,image/jpeg,application/pdf"
            icon={<MdImage />}
          />
          <span className="underline text-sm text-blue-500 cursor-pointer">
            Contoh Foto
          </span>
        </div>
        <FileInput
          error={formik.errors.raport}
          onChange={(val) => formik.setFieldValue("raport", val)}
          withAsterisk
          label="Raport"
          placeholder="Upload Files"
          accept="application/pdf"
          icon={<MdUploadFile />}
        />
        <FileInput
          withAsterisk
          onChange={(val) => formik.setFieldValue("ijazah", val)}
          error={formik.errors.ijazah}
          label="Ijazah"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
        <FileInput
          withAsterisk
          onChange={(val) => formik.setFieldValue("kartuKeluarga", val)}
          error={formik.errors.kartuKeluarga}
          label="Kartu Keluarga"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
        <FileInput
          withAsterisk
          onChange={(val) => formik.setFieldValue("akte", val)}
          error={formik.errors.akte}
          label="Akte Kelahiran"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
        <FileInput
          description="Tidak Wajib"
          onChange={(val) => formik.setFieldValue("piagamSertifikat", val)}
          label="Piagam/Sertifikat"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="primary"
          color="yellow"
          onClick={() => navigate("/form-register-edited")}
        >
          <MdArrowForwardIos className="rotate-180 mr-2" />
          <span>Kembali</span>
        </Button>
        <Button type="primary">Kirim Pendaftaran</Button>
      </div>
    </form>
  );
};

export default FormBerkas;
