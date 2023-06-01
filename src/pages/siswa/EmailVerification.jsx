import { Button } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIUsers from "../../api/users.api";
import Cookies from "js-cookie";

const EmailVerification = () => {
  const [seconds, setSeconds] = useState(10);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  const { id } = useParams();
  const sendEmail = async () => {
    await APIUsers.sendEmail(id);
  };

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <p className="text-lg mt-5">
        Email anda belum terverifikasi, silakan cek email anda untuk verifikasi,
        jika belum menerima email klik tombol dibawah ini untuk kirim ulang.
      </p>
      {seconds < 1 ? (
        <Button
          onClick={() => {
            setSeconds(60);
            sendEmail();
          }}
          type="primary"
          className="my-5"
        >
          Kirim Ulang
        </Button>
      ) : (
        <p className="my-5 bg-gray-200 p-3 rounded">
          Kirim ulang dalam {seconds} detik
        </p>
      )}
      <Button
        onClick={() => {
          Cookies.remove("accessToken");
          window.location.href = "/auth";
        }}
        type="primary"
      >
        Login Dengan Email Lain
      </Button>
    </section>
  );
};

export default EmailVerification;
