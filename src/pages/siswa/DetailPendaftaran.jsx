import React, { useContext, useState } from "react";
import useSWR from "swr";
import APIPendaftaran, { pendaftaranEndPoint } from "../../api/pendaftaran";
import { AuthProvider } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { Paper, Text } from "@mantine/core";
import { formatDateDMY, formatDateYMD } from "../../lib/formatDate";
import { MdOutlineFilePresent } from "react-icons/md";
import SkeletonTable from "../admin/components/SkeletonTable";

const DetailPendaftaran = () => {
  const ctx = useContext(AuthProvider);
  const [urlFile, setUrlFile] = useState();
  const [isOpenBackdrop, setIsOpenBack] = useState(false);
  const { id } = useParams();

  const { data: pendaftaran, isLoading } = useSWR(
    `${pendaftaranEndPoint}/${id}`,
    (url) => APIPendaftaran.get(url)
  );

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <Paper shadow="xs" p="md">
      {isOpenBackdrop && (
        <div
          onClick={(e) => setIsOpenBack(false)}
          className="backdrop fixed flex justify-center items-center cursor-pointer top-0 right-0 left-0 bottom-0 bg-black/25"
        >
          <img
            onClick={(e) => e.stopPropagation()}
            src={urlFile}
            className="w-[28rem] preview"
            alt="files"
          />
        </div>
      )}
      <h2 className="text-3xl font-medium mb-4">Informasi Pribadi</h2>
      <div className="grid grid-cols-3 gap-8">
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
      <h2 className="text-3xl font-medium my-4">Dokumen</h2>
      <div className="grid grid-cols-3 gap-8">
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
      </div>
    </Paper>
  );
};

export default DetailPendaftaran;
