import { Button, Input, PasswordInput } from "@mantine/core";
import { useFormik } from "formik";
import * as yup from "yup";
import APIUsers from "../../../api/users.api";

const ChangPasswordForm = ({ id, close }) => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await APIUsers.changePassword({ id, newPassword: values.newPassword });
        close();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required("Password harus diisi")
        .min(6, "Password minimal 6 karakter")
        .trim(),
    }),
  });

  const generatePassword = () => {
    formik.setFieldValue("newPassword", "12345678");
  };
  return (
    <section>
      <h2 className="text-lg font-semibold text-center">Change Password</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <Input.Wrapper
            size="xs"
            id="newPassword"
            label="Password"
            className="w-full"
          >
            <PasswordInput
              size="xs"
              id="newPassword"
              error={formik.errors.newPassword}
              onChange={formik.handleChange}
              name="newPassword"
              value={formik.values.newPassword}
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
          size="xs"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Change"}
        </Button>
      </form>
    </section>
  );
};

export default ChangPasswordForm;
