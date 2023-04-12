import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MENUS_SIDEBAR } from "../../../constants/Menus";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-white shadow min-h-screen sticky top-0 h-full ${
        open ? "w-72" : "w-16"
      } text-blue-500 px-4 duration-200`}
    >
      <div className={`py-3 flex ${open ? "justify-between" : "justify-end"}`}>
        {open && (
          <div className="flex items-center gap-3">
            <img className="w-8" src="/assets/images/logo.png" alt="logo" />
            <span className="text-sm font-medium whitespace-pre">
              SMAN 115 JAKARTA
            </span>
          </div>
        )}
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3 relative">
        {MENUS_SIDEBAR.map((menu, i) => (
          <NavLink
            to={menu?.link}
            key={i}
            className={`group flex items-center text-md hover:text-white gap-3.5 font-medium p-2 pr-7 hover:bg-blue-600 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              className={`whitespace-pre ${
                !open && "opacity-0 translate-x-28 overflow-hidden "
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
