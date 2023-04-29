import { Button, Pagination, Select } from "@mantine/core";
import React, { useState } from "react";
import useSWR from "swr";
import APIRegPeriod, {
  registerPeriodeEndPoint,
} from "../../../api/periode-pendaftaran.api";
import PeriodPendaftaranTable from "./PeriodPendaftaranTable";
import SkeletonTable from "../components/SkeletonTable";
import { useNavigate } from "react-router-dom";

const PeriodePendaftaran = () => {
  const [activePage, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [tahunAjaran, setTahunAjaran] = useState("");

  const navigate = useNavigate();

  const { data: regPer, isLoading } = useSWR(
    `${registerPeriodeEndPoint}?limit=${rows}&page=${activePage}${
      tahunAjaran && `&tahunAjaran=${tahunAjaran}`
    }`,
    (url) => APIRegPeriod.getAll(url)
  );

  return (
    <section className="bg-white shadow-md p-3 rounded">
      <div className="p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
        <h3 className="font-bold text-2xl">Periode Pendaftaran</h3>
        <Button
          color="teal"
          onClick={() => navigate("add")}
          variant="outline"
          className="mt-8 md:mt-0"
        >
          Buat Periode
        </Button>
      </div>
      <div className="flex flex-col md:flex-row font-normal md:items-center md:justify-between py-3">
        <Select
          size="xs"
          label="Rows"
          value={rows}
          onChange={setRows}
          data={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
          ]}
        />
        <Select
          size="xs"
          label="Tahun Ajaran"
          value={tahunAjaran}
          onChange={setTahunAjaran}
          data={[
            {
              value: "",
              label: "All",
            },
            ...Array.from({ length: 10 }, (_, i) => {
              const nowYear = new Date().getFullYear();
              return {
                value: `${nowYear - i}/${nowYear - i + 1}`,
                label: `${nowYear - i}/${nowYear - i + 1}`,
              };
            }),
          ]}
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : regPer?.data?.length === 0 ? (
        <h3 className="text-center pt-4 font-medium">Data Kosong</h3>
      ) : (
        <PeriodPendaftaranTable data={regPer?.data} />
      )}
      <div className="flex justify-end py-3">
        <Pagination
          total={regPer?.totalPage}
          value={activePage}
          onChange={setPage}
          color="indigo"
        />
      </div>
    </section>
  );
};

export default PeriodePendaftaran;
