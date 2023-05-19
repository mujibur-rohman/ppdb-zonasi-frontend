import { Accordion, Button } from "@mantine/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import useSWR from "swr";
import APIPendaftaran, { pendaftaranEndPoint } from "../../api/pendaftaran";
import { formatComplete } from "../../lib/formatDate";

const Home = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthProvider);

  const { data: pendaftaran } = useSWR(
    `${pendaftaranEndPoint}/${ctx.user.id}/${ctx.periodePendaftaran.id}`,
    (url) => APIPendaftaran.get(url)
  );

  const isOpenRegister = () => {
    const start = new Date(ctx.periodePendaftaran.startDate).getTime();
    const end = new Date(ctx.periodePendaftaran.endDate).getTime();
    const now = Date.now();
    return now > start && now < end;
  };

  const hasMissedRegister = () => {
    const start = new Date(ctx.periodePendaftaran.startDate).getTime();
    const end = new Date(ctx.periodePendaftaran.endDate).getTime();
    const now = Date.now();
    return now > start && now > end;
  };

  return (
    <>
      <h2 className="text-2xl mb-5">
        Tahun Ajaran {ctx.periodePendaftaran.tahunAjaran}
      </h2>
      {isOpenRegister() ? (
        pendaftaran ? (
          <div className="bg-green-100 mb-5 py-5 px-3 rounded-md shadow-sm flex justify-between">
            <span className="text-lg lg:text-xl text-green-500">
              Anda Sudah Mendaftar, Silahkan lihat status pendaftaran anda!
            </span>
            <Button
              type="primary"
              variant="light"
              color="green"
              onClick={() => {
                navigate("/pendaftaran");
              }}
            >
              Lihat Pendaftaran
            </Button>
          </div>
        ) : (
          <div className="bg-white mb-5 py-5 px-3 rounded-md shadow-sm flex justify-between">
            <span className="text-lg lg:text-xl">
              Periode Pendaftaran :{" "}
              {formatComplete(ctx.periodePendaftaran.startDate)} -{" "}
              {formatComplete(ctx.periodePendaftaran.endDate)}
            </span>
            <Button
              type="primary"
              onClick={() => {
                window.location.href = "/form-register";
              }}
            >
              Daftar Sekarang
            </Button>
          </div>
        )
      ) : hasMissedRegister() ? (
        <div className="bg-red-200 mb-5 py-5 px-3 rounded-md shadow-sm flex justify-between">
          <span className="text-lg lg:text-xl text-red-500">
            Pendaftaran Sudah Ditutup!
          </span>
        </div>
      ) : (
        <div className="bg-blue-200 mb-5 py-5 px-3 rounded-md shadow-sm flex justify-between">
          <span className="text-lg lg:text-xl text-blue-500">
            Pendaftaran Akan Segera Dibuka!
          </span>
        </div>
      )}
      <div className="bg-white mb-5 py-5 px-3 rounded-md shadow-sm">
        <div>
          <h1 className="text-lg mb-0 font-medium">{ctx.school.schoolName}</h1>
          <span className="text-gray-400 text-sm">{ctx.school.npsn}</span>
        </div>
        <p className="text-sm mb-0">{ctx.school.address}</p>
      </div>
      <div>
        <span className="font-medium mb-2 block text-lg">Detail Kuota</span>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
          <Accordion variant="contained" className="bg-white">
            <Accordion.Item value="photos">
              <Accordion.Control>
                <span className="font-medium">IPA</span>
              </Accordion.Control>
              <Accordion.Panel>
                <table className="flex flex-col gap-3">
                  <tbody>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Kuota</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Pendaftar</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Kualifikasi</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">
                        Diskualifikasi
                      </td>
                      <td>6</td>
                    </tr>
                  </tbody>
                </table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="contained" className="bg-white">
            <Accordion.Item value="photos">
              <Accordion.Control>
                <span className="font-medium">IPA</span>
              </Accordion.Control>
              <Accordion.Panel>
                <table className="flex flex-col gap-3">
                  <tbody>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Kuota</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Pendaftar</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">Kualifikasi</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td className="md:w-36 w-28 font-medium">
                        Diskualifikasi
                      </td>
                      <td>6</td>
                    </tr>
                  </tbody>
                </table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Home;
