import { Button, Input, PasswordInput, Select } from "@mantine/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import APIUsers, { usersEndPoint } from "../../../api/users.api";

const AddForm = ({ close, mutateUsers }) => {
  const [roleSelect, setRoleSelect] = useState();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      role: "",
      password: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      const { email, fullName, password, role } = values;
      try {
        await APIUsers.addUsers({ email, fullName, password, role });
        formik.resetForm();
        mutateUsers();
        close();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      fullName: yup.string().required("Nama lengkap harus diisi").trim(),
      email: yup.string().email().required("Email harus diisi").trim(),
      role: yup.string().required(),
      password: yup
        .string()
        .required("Password harus diisi")
        .min(6, "Password minimal 6 karakter")
        .trim(),
    }),
  });

  const generatePassword = () => {
    formik.setFieldValue("password", "12345678");
  };
  return (
    <section>
      <h2 className="text-lg font-semibold text-center">Tambah Users</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
        <Input.Wrapper
          size="xs"
          id="fullName"
          label="Nama Lengkap"
          error={formik.errors.fullName}
        >
          <Input
            size="xs"
            id="fullName"
            onChange={formik.handleChange}
            name="fullName"
            value={formik.values.fullName}
            placeholder="Nama Lengkap"
            error={formik.errors.fullName}
          />
        </Input.Wrapper>
        <Input.Wrapper
          size="xs"
          id="email"
          label="Email"
          error={formik.errors.email}
        >
          <Input
            size="xs"
            id="email"
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            placeholder="Email"
            error={formik.errors.email}
          />
        </Input.Wrapper>
        <Input.Wrapper size="xs" id="role" label="Role">
          <Select
            size="xs"
            id="role"
            error={formik.errors.role}
            placeholder="Select Role"
            value={roleSelect}
            onChange={(val) => {
              console.log(val);
              formik.setFieldValue("role", val);
            }}
            data={[
              { value: 0, label: "Admin" },
              { value: 1, label: "Varifikator" },
              { value: 2, label: "Calon Siswa" },
            ]}
          />
        </Input.Wrapper>

        <div className="flex items-start gap-3">
          <Input.Wrapper
            size="xs"
            id="password"
            label="Password"
            className="w-full"
          >
            <PasswordInput
              size="xs"
              id="password"
              error={formik.errors.password}
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              placeholder="Password"
            />
          </Input.Wrapper>
          <Button
            className="mt-6"
            onClick={generatePassword}
            size="xs"
            variant="outline"
            color="teal"
          >
            Default Password
          </Button>
        </div>
        <Button
          className="mt-3"
          type="secondary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </section>
  );
};

export default AddForm;
