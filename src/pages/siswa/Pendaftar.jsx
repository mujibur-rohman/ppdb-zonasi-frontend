import React, { useContext } from "react";
import useSWR from "swr";
import { AuthProvider } from "../../context/AuthContext";
import APIPendaftaran, { pendaftaranEndPoint } from "../../api/pendaftaran";
import { Badge, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

const Pendaftar = () => {
  const ctx = useContext(AuthProvider);
  const navigate = useNavigate();

  const {
    data: pendaftaran,
    isLoading: loadingRegister,
    mutate,
  } = useSWR(`${pendaftaranEndPoint}/user/${ctx.user.id}`, (url) =>
    APIPendaftaran.get(url)
  );

  const openDeleteModal = (id) => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: "Batalkan Pendaftaran",
      children: (
        <Text size="sm">
          Pendaftaran yang dibatalkan tidak akan bisa dikembalikan lagi, apakah
          yakin?
        </Text>
      ),
      labels: { confirm: "Batalkan", cancel: "Cancel" },
      confirmProps: { color: "red", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        await APIPendaftaran.deletePendaftaran(id);
        mutate();
      },
    });
  };

  const statusBadge = (status) => {
    switch (status) {
      case -2:
        return (
          <Badge color="red" size="lg">
            Jarak Anda Terlalu Jauh
          </Badge>
        );
      case -1:
        return (
          <Badge color="gray" size="lg">
            Dokumen Belum DiUpload
          </Badge>
        );
      case 0:
        return (
          <Badge color="yellow" size="lg">
            Sedang Diverifikasi
          </Badge>
        );
      case 1:
        return (
          <Badge color="teal" size="lg">
            Kualifikasi
          </Badge>
        );
      case 2:
        return (
          <Badge color="red" size="lg">
            Diskualifikasi
          </Badge>
        );

      default:
        return (
          <Badge color="red" size="lg">
            Invalid
          </Badge>
        );
    }
  };

  return (
    <section>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="pt-5 pb-1 px-5">
          <h1 className="text-lg text-center font-medium">Pendaftaran Saya</h1>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {pendaftaran?.length === 0 ? (
            <p className="text-center">Belum ada pendaftaran</p>
          ) : (
            pendaftaran?.map((reg) => (
              <div
                key={reg.id}
                className="border-[1px] p-5 rounded-lg items-center flex justify-between"
              >
                <div className="flex flex-col">
                  <p className="font-medium">Tahun Ajaran</p>
                  <span className="text-lg">
                    {reg.register_period.tahunAjaran}
                  </span>
                </div>
                <div>{statusBadge(reg.status)}</div>
                <div className="flex gap-2">
                  {reg.status === -1 && (
                    <>
                      <Button
                        type="primary"
                        color="yellow"
                        variant="outline"
                        size="xs"
                        onClick={() => navigate("/form-register/berkas")}
                      >
                        Tambah Dokumen
                      </Button>
                    </>
                  )}
                  {reg.status <= 0 && (
                    <>
                      <Button
                        type="primary"
                        color="red"
                        variant="outline"
                        size="xs"
                        onClick={() => {
                          openDeleteModal(reg.id);
                        }}
                      >
                        Batalkan Pendaftaran
                      </Button>
                      <Button
                        type="primary"
                        color="cyan"
                        variant="outline"
                        size="xs"
                        onClick={() => {
                          navigate("/form-register-edited");
                        }}
                      >
                        Ubah Pendaftaran
                      </Button>
                    </>
                  )}
                  <Button
                    type="primary"
                    color="blue"
                    variant="outline"
                    size="xs"
                    onClick={() => navigate(`/pendaftaran/${reg.id}`)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Pendaftar;
