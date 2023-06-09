import { Button, NumberInput, Select, Skeleton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import useSWR from "swr";
import APIJurusan, { jurusanEndPoint } from "../../../../api/jurusan.api";
import APIRegPeriod from "../../../../api/periode-pendaftaran.api";
import { AuthProvider } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddPages = () => {
  const [kuotaState, setKuotaState] = useState({});

  const navigate = useNavigate();
  const { user } = useContext(AuthProvider);

  const { data: jurusan, isLoading } = useSWR(jurusanEndPoint, (url) =>
    APIJurusan.getJurusan(url)
  );

  useEffect(() => {
    if (!isLoading) {
      let objKuota = {};
      jurusan?.forEach((el) => {
        objKuota[el.name] = {
          jurusan: el.id,
          kuota: 0,
        };
      });
      setKuotaState(objKuota);
    }
  }, [jurusan]);

  const formik = useFormik({
    initialValues: {
      tahunAjaran: ``,
      maxDistance: "",
      startDate: "",
      endDate: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      tahunAjaran: yup.string().required("tahun ajaran wajib diisi"),
      startDate: yup.string().required("tanggal dibuka wajib diisi"),
      maxDistance: yup.number().required("jarak maksimal dibuka wajib diisi"),
      endDate: yup.string().required("tanggal ditutup wajib diisi"),
    }),
    onSubmit: async (val, props) => {
      const { endDate, startDate, tahunAjaran, maxDistance } = val;
      let kuotaArr = [];
      jurusan?.forEach((el) => {
        kuotaArr.push(kuotaState[el.name]);
      });

      try {
        await APIRegPeriod.addData(
          {
            userId: user.id,
            startDate,
            tahunAjaran,
            endDate,
            kuota: kuotaArr,
            maxDistance,
          },
          navigate
        );
        props.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <section className="bg-white shadow-md p-3 rounded">
      <div className="py-4 flex flex-col items-start">
        <h3 className="font-bold text-2xl">Periode Pendaftaran</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Select
          className="w-full border-red-200"
          label="Tahun Ajaran"
          placeholder="Tahun Ajaran"
          value={formik.values.tahunAjaran}
          onChange={(e) => formik.setFieldValue("tahunAjaran", e)}
          data={[
            ...Array.from({ length: 4 }, (_, i) => {
              const nowYear = new Date().getFullYear();
              return {
                value: `${nowYear + i}/${nowYear + i + 1}`,
                label: `${nowYear + i}/${nowYear + i + 1}`,
              };
            }),
          ]}
          error={formik.errors.tahunAjaran}
        />
        <div className="flex flex-col md:flex-row gap-2">
          <DateInput
            dateParser={(input) => {
              if (input === "WW2") {
                return new Date(1939, 8, 1);
              }
              return new Date(input);
            }}
            onChange={(e) => formik.setFieldValue("startDate", e)}
            value={formik.values.startDate}
            error={formik.errors.startDate}
            className="w-full"
            valueFormat="DD/MM/YYYY"
            label="Tanggal Dibuka"
            placeholder="Start Date"
            icon={<MdCalendarMonth />}
          />
          <DateInput
            dateParser={(input) => {
              if (input === "WW2") {
                return new Date(1939, 8, 1);
              }
              return new Date(input);
            }}
            disabled={!formik.values.startDate}
            onChange={(e) => formik.setFieldValue("endDate", e)}
            value={formik.values.endDate}
            error={formik.errors.endDate}
            minDate={formik.values.startDate}
            className="w-full"
            valueFormat="DD/MM/YYYY"
            label="Tanggal Ditutup"
            placeholder="End Date"
            icon={<MdCalendarMonth />}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <NumberInput
            onChange={(val) => formik.setFieldValue("maxDistance", val)}
            value={formik.values.maxDistance}
            error={formik.errors.maxDistance}
            placeholder="Jarak"
            label="Jarak Maksimal"
            withAsterisk
            min={1}
          />
        </div>
        <p className="font-bold py-1 mt-3">Kuota</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {isLoading ? (
            <>
              <Skeleton height={50} className="w-full" radius="md" my="md" />
              <Skeleton height={50} className="w-full" radius="md" my="md" />
            </>
          ) : (
            jurusan?.map((jur) => (
              <NumberInput
                key={jur.id}
                label={jur.name}
                placeholder="0"
                min={0}
                value={kuotaState[jur.name]?.kuota || 0}
                onChange={(e) => {
                  setKuotaState({
                    ...kuotaState,
                    [jur.name]: { jurusan: jur.id, kuota: e },
                  });
                }}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              />
            ))
          )}
        </div>
        <div className="flex justify-end mt-2">
          <Button
            className="mt-3"
            disabled={formik.isSubmitting}
            type="secondary"
          >
            {formik.isSubmitting ? "Loading.." : "Buat"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddPages;
