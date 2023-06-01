import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="px-5 lg:px-36 pt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layouts;
