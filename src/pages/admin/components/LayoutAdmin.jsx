import React, { useContext, useState } from "react";
import { MdKeyboardArrowDown, MdLogout, MdPermIdentity } from "react-icons/md";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthProvider } from "../../../context/AuthContext";
import { useClickOutside } from "@mantine/hooks";

const LayoutAdmin = () => {
  const { user } = useContext(AuthProvider);
  const [showMenu, setShowMenu] = useState(false);
  const refOutside = useClickOutside(() => setShowMenu(false));
  return (
    <section className="flex min-h-screen w-screen bg-slate-50">
      <Sidebar />
      <div className="text-gray-900 w-full">
        <nav className="shadow h-12 sticky top-0 left-0 right-0 z-50 backdrop-blur flex items-center justify-end px-4 bg-white/75">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <h3 className="font-medium text-sm ml-3">{user?.fullName}</h3>
            <MdKeyboardArrowDown className="w-5 h-5" />
          </div>
          {showMenu && (
            <ul
              ref={refOutside}
              className={`absolute transition-all bg-white cursor-pointer z-10 right-2 top-12 border-[1px] rounded`}
            >
              <li className="px-4 py-2 gap-2 hover:bg-slate-100 flex items-center">
                <MdPermIdentity />
                Profile
              </li>
              <li
                onClick={() => {
                  Cookies.remove("accessToken");
                  window.location.href = "/admin";
                }}
                className="px-4 py-2 gap-2 hover:bg-slate-100 flex items-center"
              >
                <MdLogout />
                <span>Logout</span>
              </li>
            </ul>
          )}
        </nav>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default LayoutAdmin;
