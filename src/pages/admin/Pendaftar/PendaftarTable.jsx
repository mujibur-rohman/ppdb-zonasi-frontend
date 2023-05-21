import { Button, Table } from "@mantine/core";
import { useContext, useState } from "react";
import { AuthProvider } from "../../../context/AuthContext";
import { HEADERS_PENDAFTAR } from "../../../constants/TableHeaders";
import { statusPendaftar } from "../../../lib/statusCheck";
import { useNavigate } from "react-router-dom";

const PendaftarTable = ({ pendaftar }) => {
  const ctx = useContext(AuthProvider);
  const navigate = useNavigate();
  return (
    <>
      <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
        <thead>
          <tr>
            {HEADERS_PENDAFTAR.map((head, i) => (
              <th key={i}>{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-normal">
          {pendaftar?.map((pend, i) => (
            <tr key={pend.id}>
              <td>{i + 1}</td>
              <td>{pend.fullName}</td>
              <td>{pend.nisn}</td>
              <td>{pend.fromSchool}</td>
              <td>{statusPendaftar(pend.status)}</td>
              <td className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate(`/admin/pendaftar/${pend.id}`);
                  }}
                  size="xs"
                >
                  Lihat Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PendaftarTable;
