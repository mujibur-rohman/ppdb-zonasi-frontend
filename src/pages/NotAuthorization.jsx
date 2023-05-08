import React from "react";

const NotAuthorization = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen w-screen">
      <img
        className="w-[10rem] md:w-[15rem] lg:w-[23rem]"
        src="/assets/images/not_auth.svg"
        alt="Not Auth"
      />
      <p className="text-[8rem] leading-none text-blue-500 font-bold">403</p>
      <p className="text-xl font-medium">You have not access this page</p>
    </div>
  );
};

export default NotAuthorization;
