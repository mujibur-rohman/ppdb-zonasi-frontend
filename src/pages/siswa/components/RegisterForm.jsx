import { Button, Input } from "@mantine/core";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { AuthProvider } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../config/authServices";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthProvider);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      await Auth.RegisterSiswa({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      toast.success("Register Berhasil!");
      navigate("/auth");
    },
    validationSchema: yup.object({
      fullName: yup.string().required("nama wajib diisi").trim(),
      email: yup.string().required("email wajib diisi").email().trim(),
      password: yup.string().required("password wajib diisi").min(6).trim(),
    }),
  });
  return (
    <div className="w-2/3">
      <h1 className="text-2xl text-center mb-5 font-bold">Register</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <Input.Wrapper
            id="fullName"
            label="Nama"
            error={formik.errors.fullName}
          >
            <Input
              id="fullName"
              onChange={formik.handleChange}
              name="fullName"
              value={formik.values.fullName}
              placeholder="Nama"
              error={formik.errors.fullName}
            />
          </Input.Wrapper>
        </div>
        <div className="flex flex-col">
          <Input.Wrapper id="email" label="Email" error={formik.errors.email}>
            <Input
              id="email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
              placeholder="Email"
              error={formik.errors.email}
            />
          </Input.Wrapper>
        </div>
        <div className="flex flex-col">
          <Input.Wrapper
            id="password"
            label="Password"
            error={formik.errors.password}
          >
            <Input
              type="password"
              id="password"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              placeholder="Password"
              error={formik.errors.password}
            />
          </Input.Wrapper>
        </div>
        <Button type="primary" className="rounded-md">
          {formik.isSubmitting ? "Loading" : "Sign Up"}
        </Button>
        <span className="text-sm">
          Sudah punya akun?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            login
          </span>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
