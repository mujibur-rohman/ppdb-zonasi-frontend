import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen w-screen">
      <img
        className="w-[10rem] md:w-[15rem] lg:w-[23rem]"
        src="/assets/images/page_not_found.svg"
        alt="Not Found"
      />
      <p className="text-xl font-medium">NOT FOUND</p>
    </div>
  );
};

export default NotFound;
