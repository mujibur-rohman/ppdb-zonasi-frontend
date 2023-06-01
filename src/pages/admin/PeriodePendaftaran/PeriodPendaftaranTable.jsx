import { Button, Table, Text } from "@mantine/core";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { HEADERS_PERIODE_PENDAFTARAN } from "../../../constants/TableHeaders";
import { modals } from "@mantine/modals";
import APIRegPeriod from "../../../api/periode-pendaftaran.api";
import { useNavigate } from "react-router-dom";

const PeriodPendaftaranTable = ({ data, mutate }) => {
  const navigate = useNavigate();
  const openDeleteModal = (id) => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: <span className="font-bold">Delete Periode Pendaftaran</span>,
      children: (
        <Text size="sm">
          Data yang dihapus tidak akan bisa dikembalikan lagi, apakah yakin?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        await APIRegPeriod.deleteData(id);
        mutate();
      },
    });
  };
  return (
    <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
      <thead>
        <tr>
          {HEADERS_PERIODE_PENDAFTARAN.map((head, i) => (
            <th key={i}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className="font-normal">
        {data?.map((item, i) => (
          <tr key={item.id}>
            <td>{i + 1}</td>
            <td>{item.tahunAjaran}</td>
            <td>{item.maxDistance}</td>
            {/* <td>{item.kuota?.reduce((acc, cur) => acc.kuota + cur.kuota)}</td> */}
            <td className="flex items-center gap-4">
              <MdDeleteOutline
                onClick={() => {
                  openDeleteModal(item.id);
                }}
                className="text-red-500 w-6 h-6 cursor-pointer"
              />
              <Button
                onClick={() => navigate(`${item.id}/edit`)}
                color="yellow"
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
  );
};

export default PeriodPendaftaranTable;
