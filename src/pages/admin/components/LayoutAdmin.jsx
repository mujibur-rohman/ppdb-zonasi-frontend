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
    <section className="flex gap-6 min-h-screen">
      <Sidebar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        REACT TAILWIND
        <Outlet />
      </div>
    </section>
  );
};

export default LayoutAdmin;
