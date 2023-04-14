import { MdOutlineDashboard, MdWebhook } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

export const MENUS_SIDEBAR = [
  { name: "Dashboard", link: "/admin", icon: MdOutlineDashboard },
  { name: "Pendaftar", link: "/admin/pendaftar", icon: AiOutlineUser },
  { name: "Hasil Pengumuman", link: "/admin/pengumuman", icon: AiOutlineUser },
  { name: "Jurusan", link: "/admin/jurusan", icon: MdWebhook },
  { name: "Users", link: "/admin/users", icon: FaUsers },
];
