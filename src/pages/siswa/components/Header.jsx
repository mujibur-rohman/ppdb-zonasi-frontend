import { Tabs } from "@mantine/core";
import {
  MdKeyboardArrowDown,
  MdPermIdentity,
  MdLogout,
  MdHomeFilled,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import { useClickOutside } from "@mantine/hooks";
import Cookies from "js-cookie";

const Header = () => {
  const { user } = useContext(AuthProvider);
  const [showMenu, setShowMenu] = useState(false);
  const refOutside = useClickOutside(() => setShowMenu(false));

  return (
    <header>
      <nav className="bg-blue-500 px-5 lg:px-10 h-14 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-8" src="/assets/images/logo.png" alt="logo" />
          <span className="font-medium text-white hidden md:block">
            SMK NEGERI 115 JAKARTA
          </span>
        </div>
        <div className="flex items-center relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <h3 className="font-medium ml-3 text-white">{user?.fullName}</h3>
            <MdKeyboardArrowDown className="w-5 h-5 text-white" />
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
                  window.location.href = "/";
                }}
                className="px-4 py-2 gap-2 hover:bg-slate-100 flex items-center"
              >
                <MdLogout />
                <span>Logout</span>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="lg:px-32 border-b-[1px] bg-white">
        <Tabs
          defaultValue="home"
          className="border-none"
          style={{ border: "none" }}
        >
          <Tabs.List>
            <Tabs.Tab icon={<MdHomeFilled />} value="home">
              <Link to={"/"}>Home</Link>
            </Tabs.Tab>
            <Tabs.Tab icon={<FaUserFriends />} value="pendaftar">
              <Link to={"/pendaftar"}>Pendaftar</Link>
            </Tabs.Tab>
            <Tabs.Tab icon={<GrAnnounce />} value="announce">
              Pengumuman
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
