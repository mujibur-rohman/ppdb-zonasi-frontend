import React, { useState } from "react";
import { MdOutlineDashboard, MdWebhook } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  const menus = [
    { name: "Dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "Pendaftar", link: "/admin/pendaftar", icon: AiOutlineUser },
    { name: "Jurusan", link: "/admin/jurusan", icon: MdWebhook },
    { name: "Users", link: "/admin/user", icon: FaUsers },
  ];
  return (
    <section className="flex min-h-screen">
      <Sidebar />
      <div className="text-xl text-gray-900 font-semibold w-full">
        <nav className="shadow h-12 sticky top-0 left-0 right-0 z-50 backdrop-blur bg-white/75"></nav>
        <Outlet />
      </div>
    </section>
  );
};

export default LayoutAdmin;
