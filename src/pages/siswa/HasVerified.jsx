import { useEffect, useState } from "react";
import APIUsers from "../../api/users.api";
import { Navigate, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { MdCheckCircleOutline } from "react-icons/md";
import Cookies from "js-cookie";

const HasVerified = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(5);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const verify = async (id) => {
    try {
      await APIUsers.verifyEmail(id);
    } catch (error) {
      window.location.href = "/auth";
    }
    setLoading(false);
  };

  useEffect(() => {
    verify(id);
    Cookies.remove("accessToken");
    interval.start();
    return interval.stop;
  }, []);
  if (loading)
    return (
      <div className="flex justify-center pt-12">
        <Loader size="md" />
      </div>
    );

  if (seconds < 1) return <Navigate to="/auth" replace={true} />;
  return (
    <div className="flex justify-center pt-12 flex-col items-center">
      <MdCheckCircleOutline className="w-52 h-52 text-green-500" />
      <p className="font-medium text-xl">Email has verified</p>
      <p>Redirecting {seconds} seconds</p>
    </div>
  );
};

export default HasVerified;
