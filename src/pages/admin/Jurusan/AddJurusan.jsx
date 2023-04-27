import { Button, Input } from "@mantine/core";
import { useFormik } from "formik";
import * as yup from "yup";
import APIJurusan from "../../../api/jurusan.api";

const AddJurusan = ({ mutate, close }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name } = values;
      try {
        await APIJurusan.addJurusan({ name });
        formik.resetForm();
        mutate();
        close();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object({
      name: yup.string().required("jurusan harus diisi").trim(),
    }),
  });
  return (
    <section>
      <h2 className="text-lg font-semibold text-center">Tambah Jurusan</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
        <Input.Wrapper
          size="xs"
          id="fullName"
          label="Nama Jurusan"
          error={formik.errors.name}
        >
          <Input
            size="xs"
            id="fullName"
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
            placeholder="Nama Jurusan"
            error={formik.errors.name}
          />
        </Input.Wrapper>

        <Button
          className="mt-3"
          type="secondary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Tambah"}
        </Button>
      </form>
    </section>
  );
};

export default AddJurusan;
