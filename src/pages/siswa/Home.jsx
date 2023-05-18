import { Accordion, Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white mb-5 py-5 px-3 rounded-md shadow-sm flex justify-between">
        <span className="text-lg lg:text-xl">
          Periode Pendaftaran : 20 Desember 2022 - 27 Desember 2022
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
      <div className="bg-white mb-5 py-5 px-3 rounded-md shadow-sm">
        <div>
          <h1 className="text-lg mb-0 font-medium">SMK NEGERI 115 JAKARTA</h1>
          <span className="text-gray-400 text-sm">NPSN : 1398342</span>
        </div>
        <p className="text-sm mb-0">
          Jl Rorotan RT 004, Desa Rorotan Kecamata Cilincing
        </p>
      </div>
      <div className="bg-white mb-5 py-3 px-3 rounded-md shadow-sm">
        <h1 className="font-bold text-lg lg:text-xl mb-4">
          Informasi Pendaftaran Tahun Ajaran 2020/2021
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
          <div className="flex flex-col items-center bg-blue-500 rounded-lg text-white py-4">
            <span className="text-2xl font-bold">23</span>
            <span className="text-md">Kuota</span>
          </div>
          <div className="flex flex-col items-center bg-green-500 rounded-lg text-white py-4">
            <span className="text-2xl font-bold">23</span>
            <span className="text-md">Total Pendaftar</span>
          </div>
          <div className="flex flex-col items-center bg-purple-500 rounded-lg text-white py-4">
            <span className="text-2xl font-bold">23</span>
            <span className="text-md">Jurusan</span>
          </div>
          <div className="flex flex-col items-center bg-red-500 rounded-lg text-white py-4">
            <span className="text-2xl font-bold">23</span>
            <span className="text-md">Terdiskualifikasi</span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-medium mb-2 block text-lg">Detail</span>
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
