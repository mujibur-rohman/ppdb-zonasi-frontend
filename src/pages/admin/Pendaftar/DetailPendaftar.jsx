import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Badge, Button, Divider, Paper, Text } from "@mantine/core";
import { MdOutlineFilePresent } from "react-icons/md";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { formatDateDMY, formatDateYMD } from "../../../lib/formatDate";
import SkeletonTable from "../components/SkeletonTable";
import Maps from "../components/Maps";
import { modals } from "@mantine/modals";
import { statusButton } from "../../../lib/statusCheck";
import APIStatus from "../../../api/status.api";

const DetailPendaftar = () => {
  const [urlFile, setUrlFile] = useState();
  const [isOpenBackdrop, setIsOpenBack] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { id } = useParams();

  const {
    data: pendaftaran,
    isLoading,
    mutate,
  } = useSWR(`${pendaftaranEndPoint}/${id}`, (url) => APIPendaftaran.get(url));

  const openVerifModal = ({ id, message, header, isDecline }) => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: <span className="font-medium">{header}</span>,
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: "Yes", cancel: "No" },
      confirmProps: { color: "green", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        if (!isDecline) {
          await APIStatus.selectionPendaftaran(id);
        } else {
          await APIStatus.decline(id);
        }
        mutate();
      },
    });
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <Paper shadow="xs" p="md">
      {isOpenBackdrop && (
        <div
          onClick={(e) => setIsOpenBack(false)}
          className="backdrop z-50 fixed flex justify-center items-center cursor-pointer top-0 right-0 left-0 bottom-0 bg-black/25"
        >
          <img
            onClick={(e) => e.stopPropagation()}
            src={urlFile}
            className="w-[28rem] preview"
            alt="files"
          />
        </div>
      )}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-medium mb-4">Informasi Pribadi</h2>
        <div className="flex gap-3">
          {statusButton(pendaftaran.status, pendaftaran.id, openVerifModal)}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div className="flex flex-col gap-1">
          <span>Nama</span>
          <span className="text-xl font-medium">{pendaftaran?.fullName}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Tanggal Lahir</span>
          <span className="text-xl font-medium">
            {formatDateDMY(formatDateYMD(new Date(pendaftaran?.birthday)))}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Jenis Kelamin</span>
          <span className="text-xl font-medium">{pendaftaran?.gender}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Agama</span>
          <span className="text-xl font-medium">{pendaftaran?.religion}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>NISN</span>
          <span className="text-xl font-medium">{pendaftaran?.nisn}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Asal Sekolah</span>
          <span className="text-xl font-medium">{pendaftaran?.fromSchool}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Alamat Lengkap</span>
          <span className="text-xl font-medium">{pendaftaran?.address}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Jurusan Yang Dipilih</span>
          <span className="text-xl font-medium">
            {pendaftaran?.jurusan.name}
          </span>
        </div>
      </div>
      <Divider my="sm" className="my-9" variant="solid" />
      <h2 className="text-3xl font-medium my-3">Dokumen</h2>
      <div className="grid grid-cols-4 gap-8">
        <div className="flex flex-col gap-1">
          <span>Ijazah</span>
          {pendaftaran?.document?.ijazah ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.ijazah);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Ijazah</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Foto</span>
          {pendaftaran?.document?.photo ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.photo);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Foto</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Foto Dengan Lokasi</span>
          {pendaftaran?.document?.photoWithKord ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.photoWithKord);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Foto Dengan Lokasi</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Akte</span>
          {pendaftaran?.document?.akte ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.akte);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Akte</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Kartu Keluarga</span>
          {pendaftaran?.document?.kartuKeluarga ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.kartuKeluarga);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Kartu Keluarga</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Raport</span>
          {pendaftaran?.document?.raport ? (
            <a
              target="_blank"
              href={pendaftaran?.document?.raport}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Raport</span>
            </a>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Piagam/Sertifikat</span>
          {pendaftaran?.document?.piagamSertifikat ? (
            <div
              onClick={() => {
                setUrlFile(pendaftaran?.document?.piagamSertifikat);
                setIsOpenBack(true);
              }}
              className="flex items-center text-green-500 gap-1 border-[1px] px-1 cursor-pointer w-fit rounded border-green-500"
            >
              <MdOutlineFilePresent className="text-green-500" />
              <span>Piagam/Sertifikat</span>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>Jarak</span>
          <span className="text-xl font-medium">
            <Badge color="yellow" size="xl">
              {pendaftaran?.jarak} Km
            </Badge>
          </span>
        </div>
      </div>
      <div className="mt-4">
        <span>Titik Lokasi</span>
        <div
          className={`h-72 my-1 relative w-full rounded overflow-hidden border-[1px]`}
        >
          <Maps
            onLoad={(map) => setMap(map)}
            onClickPin={() => {
              map.panTo({
                lat: pendaftaran.latitude * 1,
                lng: pendaftaran.longitude * 1,
              });
            }}
            geo={{
              lat: pendaftaran?.latitude * 1,
              lng: pendaftaran?.longitude * 1,
            }}
            markerVal={{
              lat: pendaftaran?.latitude * 1,
              lng: pendaftaran?.longitude * 1,
            }}
          />
        </div>
      </div>
    </Paper>
  );
};

export default DetailPendaftar;
