import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Input } from "@mantine/core";

const LoginAdmin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is a required field").trim(),
      password: yup.string().required().min(6).trim(),
    }),
  });
  return (
    <div className="w-2/3">
      <h1 className="text-2xl text-center mb-5 font-bold">Login Dashboard</h1>
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
              id="password"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              placeholder="Password"
              error={formik.errors.password}
            />
          </Input.Wrapper>
        </div>
        <Button type="primary" className="rounded-md" variant="filled">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginAdmin;