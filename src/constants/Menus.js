import { MdCalendarMonth, MdOutlineDashboard, MdWebhook } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

export const MENUS_SIDEBAR = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: MdOutlineDashboard,
    role: [0, 1, 2],
  },
  {
    name: "Pendaftar",
    link: "/admin/pendaftar",
    icon: AiOutlineUser,
    role: [1],
  },
  {
    name: "Hasil Kualifikasi",
    link: "/admin/qualification",
    icon: HiOutlineSpeakerphone,
    role: [1],
  },
  {
    name: "Periode Pendaftaran",
    link: "/admin/periode-pendaftaran",
    icon: MdCalendarMonth,
    role: [0],
  },
  { name: "Jurusan", link: "/admin/jurusan", icon: MdWebhook, role: [0] },
  { name: "Users", link: "/admin/users", icon: FaUsers, role: [0] },
  {
    name: "Profil Sekolah",
    link: "/admin/school-setting/edit",
    icon: FaUsers,
    role: [0],
  },
];
