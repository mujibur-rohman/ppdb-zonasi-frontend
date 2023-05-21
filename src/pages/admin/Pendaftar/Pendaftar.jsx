import { Input, Pagination, Select, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import useSWR from "swr";
import SkeletonTable from "../components/SkeletonTable";
import { useDebouncedValue } from "@mantine/hooks";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import PendaftarTable from "./PendaftarTable";

const Pendaftar = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [rows, setRows] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [activePage, setPage] = useState(1);

  const {
    data: pendaftar,
    isLoading,
    mutate,
  } = useSWR(
    `${pendaftaranEndPoint}?page=${activePage}&limit=${rows}${
      debouncedSearch && `&search=${debouncedSearch}`
    }&status=${activeTab}`,
    (url) => APIPendaftaran.get(url)
  );

  return (
    <>
      <section className="bg-white shadow-md p-3 rounded">
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
          <Input.Wrapper label="Search">
            <Input
              icon={<MdSearch />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="xs"
              placeholder="Cari Nama"
            />
          </Input.Wrapper>
        </div>
        <Tabs
          value={activeTab}
          onClick={() => setPage(1)}
          onTabChange={setActiveTab}
        >
          <Tabs.List>
            <Tabs.Tab value={"0"}>Belum Diverifikasi</Tabs.Tab>
            <Tabs.Tab value={"-1"}>Belum Upload Dokumen</Tabs.Tab>
            <Tabs.Tab value={"1"}>Kualifikasi</Tabs.Tab>
            <Tabs.Tab value={"2"}>Diskualifikasi</Tabs.Tab>
            <Tabs.Tab value={"-2"}>Tidak Masuk Seleksi</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {isLoading ? (
          <SkeletonTable />
        ) : pendaftar?.data?.length === 0 ? (
          <h3 className="text-center pt-4 font-medium">Data Kosong</h3>
        ) : (
          <div className="overflow-auto">
            <PendaftarTable pendaftar={pendaftar?.data} />
          </div>
        )}
        <div className="flex justify-end py-3">
          <Pagination
            total={pendaftar?.totalPage}
            value={activePage}
            onChange={setPage}
            color="indigo"
          />
        </div>
      </section>
    </>
  );
};

export default Pendaftar;
