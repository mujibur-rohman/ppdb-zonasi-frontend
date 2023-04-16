import {
  Button,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
  Tabs,
} from "@mantine/core";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import UsersTable from "./UsersTable";
import useSWR from "swr";
import APIUsers, { usersEndPoint } from "../../../api/users.api";
import SkeletonTable from "../components/SkeletonTable";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import AddForm from "./AddForm";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const headers = [
  { key: 0, label: "No" },
  { key: 1, label: "Nama" },
  { key: 2, label: "Email" },
  { key: 3, label: "Role" },
  { key: 4, label: "Email Terferifikasi" },
  { key: 5, label: "" },
];

const Users = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState("0");
  const [rows, setRows] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [activePage, setPage] = useState(1);

  const {
    data: users,
    isLoading,
    error,
  } = useSWR(
    `${usersEndPoint}?page=${activePage}&limit=${rows}${
      debouncedSearch && `&search=${debouncedSearch}`
    }&role=${activeTab}`,
    (url) => APIUsers.getUsers(url)
  );

  console.log(users);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <AddForm />
      </Modal>
      <section className="bg-white shadow-md p-3 rounded">
        <div className="p-4 flex justify-between items-center">
          <h3 className="font-bold text-2xl hidden md:block">List Of Users</h3>
          <Button
            color="teal"
            onClick={open}
            variant="outline"
            className="mt-8 md:mt-0"
          >
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
              { value: 3, label: "3" },
              { value: 5, label: "5" },
              { value: 10, label: "10" },
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
        <Tabs
          value={activeTab}
          onClick={() => setPage(1)}
          onTabChange={setActiveTab}
        >
          <Tabs.List>
            <Tabs.Tab value={"0"}>Admin</Tabs.Tab>
            <Tabs.Tab value={"1"}>Verifikator</Tabs.Tab>
            <Tabs.Tab value={"2"}>Calon Siswa</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {isLoading ? (
          <SkeletonTable />
        ) : users?.data?.length === 0 ? (
          <h3 className="text-center pt-4 font-medium">Data Kosong</h3>
        ) : (
          <div className="overflow-auto">
            <UsersTable
              role={activeTab}
              headers={headers}
              users={users?.data}
            />
          </div>
        )}
        <div className="flex justify-end py-3">
          <Pagination
            total={users?.totalPage}
            value={activePage}
            onChange={setPage}
            color="indigo"
          />
        </div>
      </section>
    </>
  );
};

export default Users;
