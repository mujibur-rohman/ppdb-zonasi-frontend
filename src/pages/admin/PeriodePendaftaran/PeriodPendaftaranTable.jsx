import { Button, Table } from "@mantine/core";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { HEADERS_PERIODE_PENDAFTARAN } from "../../../constants/TableHeaders";

const PeriodPendaftaranTable = ({ data }) => {
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
            <td>{item.kuota?.reduce((acc, cur) => acc.kuota + cur.kuota)}</td>
            <td className="flex items-center gap-4">
              <MdDeleteOutline className="text-red-500 w-6 h-6 cursor-pointer" />
              <Button color="yellow" variant="outline" size="xs">
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
