import React from "react";
import Login from "./components/Login";

const Auth = () => {
  return (
    <section className="flex min-w-full min-h-screen">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-full hidden basis-1/2 lg:flex justify-center">
        <div className="flex flex-col p-10 justify-center items-center">
          <img
            className="w-[70%]"
            src="/assets/images/zonasi.png"
            alt="Vector"
          />
        </div>
      </div>
      <div className="lg:basis-1/2 w-full flex flex-col items-center justify-center">
        <div className="mb-5 flex flex-col items-center">
          <h1 className="text-xl">Selamat Datang di </h1>
          <h1 className="text-xl lg:text-3xl mb-3 text-blue-500">
            PPDB Online Sistem Zonasi
          </h1>
          <img className="w-36" src="/assets/images/logo.png" alt="logo" />
        </div>
        <Login />
      </div>
    </section>
  );
};

export default Auth;
