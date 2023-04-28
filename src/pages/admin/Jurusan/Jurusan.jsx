import { Button, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useSWR from "swr";
import APIJurusan, { jurusanEndPoint } from "../../../api/jurusan.api";
import { MdDeleteOutline } from "react-icons/md";
import SkeletonTable from "../components/SkeletonTable";
import JurusanTable from "./JurusanTable";
import AddJurusan from "./AddJurusan";

const Jurusan = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: jurusan,
    isLoading,
    mutate,
  } = useSWR(jurusanEndPoint, (url) => APIJurusan.getJurusan(url));

  console.log(jurusan);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <AddJurusan mutate={mutate} close={close} />
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
          {isLoading ? (
            <SkeletonTable />
          ) : jurusan?.length === 0 ? (
            <h3 className="text-center pt-4 font-medium">Data Kosong</h3>
          ) : (
            <div className="overflow-auto">
              <JurusanTable jurusan={jurusan} mutate={mutate} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Jurusan;
