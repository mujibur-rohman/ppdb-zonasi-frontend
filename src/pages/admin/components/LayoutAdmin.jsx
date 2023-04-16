import React, { useState } from "react";
import { MdKeyboardArrowDown, MdLogout, MdPermIdentity } from "react-icons/md";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Menu } from "@mantine/core";
import Cookies from "js-cookie";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  return (
    <section className="flex min-h-screen w-screen bg-slate-50">
      <Sidebar />
      <div className="text-xl text-gray-900 w-full">
        <nav className="shadow h-12 sticky top-0 left-0 right-0 z-50 backdrop-blur flex items-center justify-end px-4 bg-white/75">
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                <h3 className="font-medium text-sm ml-3">Menu</h3>
                <MdKeyboardArrowDown className="w-5 h-5" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<MdPermIdentity className="w-5 h-5" />}
                href="https://mantine.dev"
              >
                Profile
              </Menu.Item>
              <Menu.Item
                icon={<MdLogout className="w-5 h-5" />}
                target="_blank"
              >
                <div
                  onClick={() => {
                    Cookies.remove("accessToken");
                    navigate("/admin/auth");
                  }}
                >
                  Logout
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </nav>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default LayoutAdmin;
