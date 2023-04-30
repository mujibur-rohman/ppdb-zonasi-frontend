import { Button, NumberInput, Select, Skeleton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import useSWR from "swr";
import APIJurusan, { jurusanEndPoint } from "../../../../api/jurusan.api";
import APIRegPeriod, {
  registerPeriodeEndPoint,
} from "../../../../api/periode-pendaftaran.api";
import { AuthProvider } from "../../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonTable from "../../components/SkeletonTable";

const EditPages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthProvider);
  const { data: jurusan, isLoading } = useSWR(jurusanEndPoint, (url) =>
    APIJurusan.getJurusan(url)
  );
  const { data: regPer, isLoading: isLoadingRegPer } = useSWR(
    `${registerPeriodeEndPoint}/${id}`,
    (url) => APIRegPeriod.getAll(url)
  );
  const [kuotaState, setKuotaState] = useState({});

  useEffect(() => {
    if (!isLoadingRegPer) {
      let objKuota = {};
      regPer?.kuota?.forEach((el) => {
        objKuota[el.jurusan.name] = {
          jurusan: el.jurusan.id,
          kuota: el.kuota,
        };
      });
      setKuotaState(objKuota);
    }
  }, [regPer]);
  console.log(kuotaState);

  const formik = useFormik({
    initialValues: {
      tahunAjaran: regPer?.tahunAjaran,
      startDate: isLoadingRegPer ? "" : new Date(regPer?.startDate),
      endDate: isLoadingRegPer ? "" : new Date(regPer?.endDate),
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({
      tahunAjaran: yup.string().required("tahun ajaran wajib diisi"),
      startDate: yup.string().required("tanggal dibuka wajib diisi"),
      endDate: yup.string().required("tanggal ditutup wajib diisi"),
    }),
    onSubmit: async (val, props) => {
      const { endDate, startDate, tahunAjaran } = val;
      let kuotaArr = [];
      jurusan?.forEach((el) => {
        kuotaArr.push(kuotaState[el.name]);
      });

      try {
        await APIRegPeriod.editData(
          {
            id,
            userId: regPer.userId,
            startDate,
            tahunAjaran,
            endDate,
            kuota: kuotaArr,
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
      {isLoadingRegPer ? (
        <SkeletonTable />
      ) : (
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
              {formik.isSubmitting ? "Loading.." : "Update"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditPages;
