import { Button, FileInput } from "@mantine/core";
import React, { useContext } from "react";
import { MdArrowForwardIos, MdImage, MdUploadFile } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { AuthProvider } from "../../../context/AuthContext";
import useSWR from "swr";
import * as yup from "yup";
import { useFormik } from "formik";
import APIDocument from "../../../api/documant.api";

const FormBerkas = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthProvider);
  const { data: pendaftaran } = useSWR(
    `${pendaftaranEndPoint}/${ctx.user.id}/${ctx.periodePendaftaran.id}`,
    (url) => APIPendaftaran.get(url)
  );

  const formik = useFormik({
    initialValues: {
      ijazah: "",
      raport: "",
      photo: "",
      akte: "",
      kartuKeluarga: "",
      piagamSertifikat: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      ijazah: yup.string().required("ijazah lengkap wajib diisi"),
      raport: yup.string().required("raport wajib diisi"),
      photo: yup.string().required("photo wajib diisi"),
      akte: yup.string().required("akte wajib diisi"),
      kartuKeluarga: yup.string().required("kartu keluarga wajib diisi"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const val in values) {
        formData.append(val, values[val]);
      }
      formData.append("pendaftaranId", pendaftaran.id);
      const docs = await APIDocument.addDocument(formData);
      if (docs) {
        await APIPendaftaran.updateStatus(pendaftaran.id);
      }
      navigate("/");
    },
  });

  if (pendaftaran?.document) {
    return <Navigate to="/form-register/berkas-edit" replace />;
  }

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
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
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
          onChange={(val) => formik.setFieldValue("piagamSertifikat", val)}
          label="Piagam/Sertifikat"
          placeholder="Upload Files"
          accept="image/png,image/jpeg,application/pdf"
          icon={<MdImage />}
        />
      </div>
      <div className="flex gap-2 justify-end my-5">
        <Button
          type="primary"
          color="yellow"
          onClick={() => navigate("/form-register-edited")}
        >
          <MdArrowForwardIos className="rotate-180 mr-2" />
          <span>Kembali</span>
        </Button>
        <Button type="primary" disabled={formik.isSubmitting}>
          <span className="mr-2">
            {formik.isSubmitting ? "Loading" : "Kirim Pendaftaran"}
          </span>
          <MdArrowForwardIos />
        </Button>
      </div>
    </form>
  );
};

export default FormBerkas;
