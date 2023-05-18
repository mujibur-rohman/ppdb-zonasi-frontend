import { Button } from "@mantine/core";
import React, { useContext } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import APIPendaftaran, { pendaftaranEndPoint } from "../../../api/pendaftaran";
import { AuthProvider } from "../../../context/AuthContext";
import useSWR from "swr";

const FormBerkas = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthProvider);
  const { data: pendaftaran, isLoading: loadingRegister } = useSWR(
    `${pendaftaranEndPoint}/${ctx.user.id}/${ctx.periodePendaftaran.id}`,
    (url) => APIPendaftaran.get(url)
  );

  console.log(pendaftaran);
  return (
    <form className="bg-white p-5 rounded-md">
      <h2 className="text-xl text-center font-medium mb-5">
        Berkas Pendaftaran
      </h2>
      <div className="flex gap-2 justify-end">
        <Button
          type="primary"
          color="yellow"
          onClick={() => navigate("/form-register-edited")}
        >
          <MdArrowForwardIos className="rotate-180 mr-2" />
          <span>Kembali</span>
        </Button>
        <Button type="primary">Kirim Pendaftaran</Button>
      </div>
    </form>
  );
};

export default FormBerkas;
