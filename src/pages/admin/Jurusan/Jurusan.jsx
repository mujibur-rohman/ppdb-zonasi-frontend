import { Button, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const headers = [
  { key: 0, label: "No" },
  { key: 1, label: "Jurusan" },
  { key: 2, label: "" },
];

const Jurusan = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Test
      </Modal>
      <section className="bg-white shadow-md p-3 rounded">
        <div className="p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <h3 className="font-bold text-2xl">Jurusan</h3>
          <Button
            color="teal"
            onClick={open}
            variant="outline"
            className="mt-8 md:mt-0"
          >
            Tambah Jurusan
          </Button>
        </div>
        <div className="overflow-auto">
          <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
            <thead>
              <tr>
                {headers.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-normal">
              <tr>
                <td>1</td>
                <td>Komputer</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default Jurusan;
