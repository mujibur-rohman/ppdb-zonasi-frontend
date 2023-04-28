import { Button, Input, Modal, Pagination, Select, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import UsersTable from "./UsersTable";
import useSWR from "swr";
import APIUsers, { usersEndPoint } from "../../../api/users.api";
import SkeletonTable from "../components/SkeletonTable";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import AddForm from "./AddForm";

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
    mutate,
  } = useSWR(
    `${usersEndPoint}?page=${activePage}&limit=${rows}${
      debouncedSearch && `&search=${debouncedSearch}`
    }&role=${activeTab}`,
    (url) => APIUsers.getUsers(url)
  );

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <AddForm close={close} mutateUsers={mutate} />
      </Modal>
      <section className="bg-white shadow-md p-3 rounded">
        <div className="p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <h3 className="font-bold text-2xl">List Of Users</h3>
          <Button
            color="teal"
            onClick={open}
            variant="outline"
            className="mt-8 md:mt-0"
          >
            Tambah Users
          </Button>
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
            <UsersTable mutate={mutate} role={activeTab} users={users?.data} />
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
