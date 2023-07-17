import { Button, Input } from "@mantine/core";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { AuthProvider } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../config/authServices";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthProvider);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      const user = await Auth.LoginSiswa(values.email, values.password);
      if (user) {
        setUser(user);
        navigate("/");
      }
    },
    validationSchema: yup.object({
      email: yup.string().required("email wajib diisi").email().trim(),
      password: yup.string().required().min(6).trim(),
    }),
  });
  return (
    <div className="w-2/3">
      <h1 className="text-2xl text-center mb-5 font-bold">Login</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
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
          {formik.isSubmitting ? "Loading" : "Sign In"}
        </Button>
        <span className="text-sm">
          Belum punya akun?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            register
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
