import { Loader } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <Loader color="indigo" size="xl" variant="dots" />
    </div>
  );
};

export default Loading;
