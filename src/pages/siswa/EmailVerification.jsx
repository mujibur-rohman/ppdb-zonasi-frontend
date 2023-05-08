import { Button } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <p className="text-lg mt-5">
        Silakan cek email anda untuk verifikasi, jika belum menerima email klik
        tombol dibawah ini untuk kirim ulang.
      </p>
      {seconds < 1 ? (
        <Button
          onClick={() => {
            setSeconds(60);
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
    </section>
  );
};

export default EmailVerification;
