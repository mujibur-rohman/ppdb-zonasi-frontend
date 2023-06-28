import { Input, Pagination, Select, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import useSWR from "swr";
import SkeletonTable from "../components/SkeletonTable";
import { useDebouncedValue } from "@mantine/hooks";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import PendaftarTable from "./PendaftarTable";
import Maps from "../components/Maps";
import APIProfileSch, {
  profilSekolahEndPoint,
} from "../../../api/profile-sekolah.api";
import { BASE_URL_API } from "../../../constants/baseUrlAPI";

const Pendaftar = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [rows, setRows] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [activePage, setPage] = useState(1);

  const [markerAll, setMarkerAll] = useState([]);
  const [qualified, setQualified] = useState([]);
  const [disqualified, setDisqualified] = useState([]);
  const [geo, setGeo] = useState({});
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  // get profile sekolah untuk ambil lokasi

  const fetchDataProfile = async () => {
    try {
      const res = await APIProfileSch.getOne(profilSekolahEndPoint);
      setGeo({ lat: res?.latitude * 1, lng: res?.longitude * 1 });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllLocation = async () => {
    try {
      const res = await APIPendaftaran.get(pendaftaranEndPoint + "/all");
      setMarkerAll(
        res?.map((item) => ({
          geo: {
            lat: item.latitude * 1,
            lng: item.longitude * 1,
          },
          icon: `${BASE_URL_API}/icon/pin.png`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const verificationData = async () => {
    try {
      const res = await APIPendaftaran.get(`${pendaftaranEndPoint}?status=1`);
      setMarkerAll(
        res?.map((item) => ({
          geo: {
            lat: item.latitude * 1,
            lng: item.longitude * 1,
          },
          icon: `${BASE_URL_API}/icon/pin.png`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataProfile();
    fetchAllLocation();
  }, []);

  const {
    data: pendaftar,
    isLoading,
    mutate,
  } = useSWR(
    `${pendaftaranEndPoint}?page=${activePage}&limit=${rows}${
      debouncedSearch && `&search=${debouncedSearch}`
    }&status=${activeTab * 1}`,
    (url) => APIPendaftaran.get(url)
  );
  return (
    <>
      <section className="bg-white shadow-md p-3 rounded">
        <div className="flex gap-4 w-full">
          <div
            className={`h-96 my-1 relative w-full rounded overflow-hidden border-[1px] border-gray-300`}
          >
            <Maps
              onLoad={(map) => setMap(map)}
              geo={geo}
              markerVal={geo}
              markerArray={markerAll}
            />
          </div>
          <div
            className={`h-96 my-1 relative w-full rounded overflow-hidden border-[1px] border-gray-300`}
          >
            <Maps
              onLoad={(map) => setMap(map)}
              geo={geo}
              markerVal={geo}
              markerArray={markerAll}
            />
          </div>
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
