import { Button, Input } from "@mantine/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      nisn: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error?.message);
      }
    },
    validationSchema: yup.object({
      nisn: yup
        .string()
        .matches(/^-?\d+\.?\d*$/, "NISN must type number")
        .required("NISN is a required field")
        .min(3, "NISN must be at least 3 characters")
        .trim(),
      password: yup.string().required().min(6).trim(),
    }),
  });
  return (
    <div className="w-2/3">
      <h1 className="text-2xl text-center mb-5 font-bold">Login</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <Input.Wrapper id="nisn" label="NISN" error={formik.errors.nisn}>
            <Input
              id="nisn"
              onChange={formik.handleChange}
              name="nisn"
              value={formik.values.nisn}
              placeholder="NISN"
              error={formik.errors.nisn}
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
              id="password"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              placeholder="Password"
              error={formik.errors.password}
            />
          </Input.Wrapper>
        </div>
        <Button
          type="primary"
          className="rounded-md"
          loading={formik.isSubmitting}
          style={{ borderRadius: "5px" }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
