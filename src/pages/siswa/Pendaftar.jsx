import { Input, Select } from "@mantine/core";
import React from "react";
import { MdSearch } from "react-icons/md";

const Pendaftar = () => {
  const optionStatus = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "diskualifikasi",
      label: "Diskualifikasi",
    },
    {
      value: "kualifikasi",
      label: "Kualifikasi",
    },
  ];

  const optionJurusan = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "ipa",
      label: "IPA",
    },
    {
      value: "ips",
      label: "IPS",
    },
  ];
  return (
    <section>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="pt-5 pb-1 px-5">
          <h1 className="text-lg">
            Calon Siswa Terdaftar Tahun Ajaran 2020/2021
          </h1>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <div className="grow">
            <Select
              label="Select Jurusan"
              placeholder="Pick one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />
          </div>
          <div className="grow">
            <Select
              label="Select Jurusan"
              placeholder="Pick one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />
          </div>
          <div className="grow">
            <Input.Wrapper label="Search">
              <Input icon={<MdSearch />} placeholder="Search" />
            </Input.Wrapper>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 w-10">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  NISN
                </th>
                <th scope="col" className="px-6 py-3">
                  Asal Sekolah
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10"
                >
                  1
                </th>
                <td className="px-6 py-4">Mujay</td>
                <td className="px-6 py-4">2378273</td>
                <td className="px-6 py-4">SMP 200 Jakarta</td>
                <td className="px-6 py-4">
                  {/* <Tag color="red">Diskualifikasi</Tag> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-5 flex justify-end">
          {/* <Pagination defaultCurrent={1} total={70} /> */}
        </div>
      </div>
    </section>
  );
};

export default Pendaftar;
