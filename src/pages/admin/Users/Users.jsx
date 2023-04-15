import { Button, Input, Pagination, Select, Table, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];
const Users = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [rows, setRows] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setPage] = useState(1);

  return (
    <section className="bg-white shadow-md p-3 rounded">
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-2xl">List Of Users</h3>
        <Button color="teal" variant="outline">
          Tambah Users
        </Button>
      </div>
      <div className="flex font-normal items-center justify-between py-3">
        <Select
          size="xs"
          label="Rows"
          placeholder="Pick One"
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
            placeholder="Your email"
          />
        </Input.Wrapper>
      </div>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={"0"}>Admin</Tabs.Tab>
          <Tabs.Tab value={"1"}>Verifikator</Tabs.Tab>
          <Tabs.Tab value={"2"}>Calon Siswa</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody className="font-normal">
          {elements.map((element) => (
            <tr key={element.name}>
              <td>{element.position}</td>
              <td>{element.name}</td>
              <td>{element.symbol}</td>
              <td>{element.mass}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end py-3">
        <Pagination
          total={10}
          value={activePage}
          onChange={setPage}
          color="indigo"
        />
      </div>
    </section>
  );
};

export default Users;
