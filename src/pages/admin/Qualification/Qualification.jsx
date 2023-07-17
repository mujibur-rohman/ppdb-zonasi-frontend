import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../context/AuthContext";
import { Badge, Button, Table, Tabs, Text } from "@mantine/core";
import { HEADERS_QUALIFICATIONS } from "../../../constants/TableHeaders";
import useSWR from "swr";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { statusPendaftar } from "../../../lib/statusCheck";
import SkeletonTable from "../components/SkeletonTable";
import { modals } from "@mantine/modals";
import APIRegPeriod, {
  registerPeriodeEndPoint,
} from "../../../api/periode-pendaftaran.api";
import Maps from "../components/Maps";
import APIProfileSch, {
  profilSekolahEndPoint,
} from "../../../api/profile-sekolah.api";
import { BASE_URL_API } from "../../../constants/baseUrlAPI";

const Qualification = () => {
  const [activeTab, setActiveTab] = useState("");

  const [markerAll, setMarkerAll] = useState([]);

  const [geo, setGeo] = useState({});
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const openSendEmailModal = () => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: <span className="font-bold">Delete Periode Pendaftaran</span>,
      children: (
        <Text size="sm">
          Apakah yakin akan mengirim email pengumuman ke semua calon siswa??
        </Text>
      ),
      labels: { confirm: "Kirim", cancel: "Cancel" },
      confirmProps: { color: "green", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        await APIPendaftaran.sendEmail();
      },
    });
  };

  const { data, isLoading } = useSWR(
    `/qualification?jurusanId=${activeTab}`,
    (url) => APIPendaftaran.qualification(url)
  );
  const { data: periodePendaftaran } = useSWR(
    `${registerPeriodeEndPoint}`,
    (url) => APIRegPeriod.getAll(`${url}/now/${new Date().getFullYear()}`)
  );

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
      const res = await APIPendaftaran.qualification(
        `/qualification?jurusanId=${activeTab}`
      );
      setMarkerAll(
        res?.map((item) => {
          return {
            geo: {
              lat: item.latitude * 1,
              lng: item.longitude * 1,
            },
            icon: `${BASE_URL_API}/icon/pin.png`,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataProfile();
    fetchAllLocation();
  }, []);

  useEffect(() => {
    if (periodePendaftaran?.kuota) {
      setActiveTab(periodePendaftaran.kuota[0].jurusan.id);
    }
  }, [periodePendaftaran]);

  return (
    <section className="bg-white shadow-md p-3 rounded">
      <div className="p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
        <h3 className="font-bold text-2xl">Hasil Kualifikasi</h3>
      </div>
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
      </div>
      <h2 className="pl-4 font-medium text-lg">Kuota</h2>
      <div className="flex pl-4 gap-4 flex-col md:flex-row font-normal md:items-center md:justify-start py-3">
        {periodePendaftaran?.kuota?.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-tr text-xl from-green-600 to-green-500 font-medium text-white p-5 rounded"
          >
            {`${item.jurusan.name} : ${item.kuota}`}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="border-[1px] ml-4 flex w-fit rounded-lg overflow-hidden">
          {periodePendaftaran?.kuota?.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.jurusan.id)}
              className={`px-4 py-1 transition-all cursor-pointer hover:bg-blue-300 ${
                activeTab === item.jurusan.id ? "bg-blue-500 text-white" : ""
              }`}
            >
              {item.jurusan.name}
            </div>
          ))}
        </div>
        <Button
          type="primary"
          variant="outline"
          color="violet"
          onClick={() => openSendEmailModal()}
          disabled={
            new Date(periodePendaftaran?.endDate).getTime() >
            new Date().getTime()
          }
        >
          Kirim Email Pengumuman
        </Button>
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : data?.length === 0 ? (
        <h3 className="text-center pt-4 font-medium">Data Kosong</h3>
      ) : (
        <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
          <thead>
            <tr>
              {HEADERS_QUALIFICATIONS.map((head, i) => (
                <th key={i}>{head.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-normal">
            {data?.map((siswa, i) => (
              <tr key={siswa.id}>
                <td>{i + 1}</td>
                <td>{siswa.fullName}</td>
                <td>{siswa.latitude}</td>
                <td>{siswa.longitude}</td>
                <td>{siswa.fromSchool}</td>
                <td>{statusPendaftar(siswa.status)}</td>
                <td>
                  <Badge color="yellow">{siswa.jarak} KM</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default Qualification;
