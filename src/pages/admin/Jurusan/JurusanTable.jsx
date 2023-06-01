import { Button, Modal, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import APIJurusan from "../../../api/jurusan.api";
import { useDisclosure } from "@mantine/hooks";
import EditForm from "./EditForm";

const headers = [
  { key: 0, label: "No" },
  { key: 1, label: "Jurusan" },
  { key: 2, label: "" },
];

const JurusanTable = ({ jurusan, mutate }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectItem, setSelectItem] = useState();

  const openDeleteModal = (id) => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: <span className="font-bold">Delete Jurusan</span>,
      children: (
        <Text size="sm">
          Data yang dihapus tidak akan bisa dikembalikan lagi, apakah yakin?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        await APIJurusan.deleteJurusan(id);
        mutate();
      },
    });
  };
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <EditForm mutate={mutate} jurusan={selectItem} close={close} />
      </Modal>
      <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
        <thead>
          <tr>
            {headers.map((head, i) => (
              <th key={i}>{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-normal">
          {jurusan?.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td className="flex items-center gap-4">
                <MdDeleteOutline
                  onClick={() => {
                    openDeleteModal(item.id);
                  }}
                  className="text-red-500 w-6 h-6 cursor-pointer"
                />
                <Button
                  color="yellow"
                  onClick={() => {
                    setSelectItem(item);
                    open();
                  }}
                  variant="outline"
                  size="xs"
                >
                  Ubah
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default JurusanTable;
