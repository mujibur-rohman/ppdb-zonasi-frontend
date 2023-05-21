import { Badge } from "@mantine/core";

export const statusPendaftar = (status) => {
  switch (status) {
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
