import { Avatar, Button, Menu, Tabs, Text } from "@mantine/core";
import {
  MdKeyboardArrowDown,
  MdPermIdentity,
  MdLogout,
  MdHomeFilled,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="bg-blue-500 px-5 lg:px-10 h-14 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-8" src="/assets/images/logo.png" alt="logo" />
          <span className="font-medium text-white hidden md:block">
            SMK NEGERI 115 JAKARTA
          </span>
        </div>
        <div className="flex items-center">
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                <h3 className="font-medium ml-3 text-white">Menu</h3>
                <MdKeyboardArrowDown className="w-5 h-5 text-white" />
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
                href="https://mantine.dev"
                target="_blank"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
