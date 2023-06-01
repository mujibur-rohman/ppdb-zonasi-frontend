import React from "react";
import LoginAdmin from "./components/LoginAdmin";

const Auth = () => {
  return (
    <section className="flex min-w-full justify-center min-h-screen">
      <div className="lg:basis-1/2 w-full flex flex-col items-center justify-center">
        <div className="mb-5 flex flex-col items-center">
          <h1 className="text-xl">Selamat Datang di </h1>
          <h1 className="text-xl lg:text-3xl text-blue-500 mb-5 font-bold">
            PPDB Online Sistem Zonasi
          </h1>
          <img className="w-36" src="/assets/images/logo.png" alt="logo" />
        </div>
        <LoginAdmin />
      </div>
    </section>
  );
};

export default Auth;
