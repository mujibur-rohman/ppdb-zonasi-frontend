import { Badge, Button } from "@mantine/core";

export const statusPendaftar = (status) => {
  switch (status) {
    case -2:
      return <Badge color="red">Tidak Masuk Seleksi</Badge>;
    case -1:
      return <Badge color="gray">Belum Upload Dokumen</Badge>;
    case 0:
      return <Badge color="yellow">Belum Diverifikasi</Badge>;
    case 1:
      return <Badge color="green">Kualifikasi</Badge>;
    case 2:
      return <Badge color="red">Diskualifikasi</Badge>;
    default:
      return "Status Tidak Valid";
  }
};

export const statusButton = (status, id, openVerifModal) => {
  switch (status) {
    case 0:
      return (
        <>
          <Button
            onClick={() =>
              openVerifModal({
                id: id,
                header: "Tolak Pendaftaran",
                isDecline: true,
                message:
                  "Pendaftaran yang ditolak tidak akan bisa dikembalikan lagi, apakah yakin?",
              })
            }
            variant="filled"
            type="primary"
            color="red"
          >
            Tolak
          </Button>
          <Button
            onClick={() =>
              openVerifModal({
                id: id,
                header: "Verifikasi Pendaftaran",
                message: "Apakah yakin akan memverifikasi pendaftaran ini?",
              })
            }
            variant="filled"
            type="primary"
            color="green"
          >
            Verifikasi
          </Button>
        </>
      );
    case 1:
      return (
        <>
          <Button
            onClick={() =>
              openVerifModal({
                isDecline: true,
                id: id,
                header: "Tolak Pendaftaran",
                message:
                  "Pendaftaran yang ditolak tidak akan bisa dikembalikan lagi, apakah yakin?",
              })
            }
            variant="filled"
            type="primary"
            color="red"
          >
            Tolak
          </Button>
        </>
      );
    case 2:
      return (
        <>
          <Button
            onClick={() =>
              openVerifModal({
                isDecline: true,
                id: id,
                header: "Tolak Pendaftaran",
                message:
                  "Pendaftaran yang ditolak tidak akan bisa dikembalikan lagi, apakah yakin?",
              })
            }
            variant="filled"
            type="primary"
            color="red"
          >
            Tolak
          </Button>
        </>
      );
    default:
      return;
  }
};
