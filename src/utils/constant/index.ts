import { RoleKey } from "../../types/roles";
import { GLOBAL_ICONS } from "../icons";
import { GLOBAL_ICONS_FA } from "../icons/fa";

export const filteringConversation: Record<string, string>[] = [
  { title: "Semua", value: "all" },
  { title: "Ditangani", value: "assigned" },
  { title: "Menunggu", value: "unassigned" },
  { title: "Arsip", value: "archived" },
];

type SettingMenuItem = {
  title: string;
  icon: React.ReactNode;
  allowed?: RoleKey[];
};

export const settingMenusMap: Record<string, SettingMenuItem> = {
  "/settings/tenant": {
    title: "Bisnis Saya",
    icon: GLOBAL_ICONS_FA.business,
    allowed: ["owner"],
  },
  "/settings/account": {
    title: "Akun",
    icon: GLOBAL_ICONS_FA.user,
    allowed: ["owner", "admin", "agent"],
  },
  "/settings/channels": {
    title: "Channel",
    icon: GLOBAL_ICONS_FA.satelit,
    allowed: ["owner", "admin"],
  },
  "/settings/users": {
    title: "Pengguna",
    icon: GLOBAL_ICONS_FA.users,
    allowed: ["owner", "admin"],
  },
  "/settings/notifications": {
    title: "Notifikasi",
    icon: GLOBAL_ICONS_FA.bell,
    allowed: ["owner", "admin"],
  },
  "/settings/bot": {
    title: "ChatBot",
    icon: GLOBAL_ICONS_FA.bot,
    allowed: ["owner", "admin"],
  },
  "/settings/subscription": {
    title: "Langganan",
    icon: GLOBAL_ICONS_FA.tags,
    allowed: ["owner"],
  },
};

export const channelsMap = {
  Whatsapp: { icon: GLOBAL_ICONS.whatsapp, value: "whatsapp" },
  Facebook: { icon: GLOBAL_ICONS.facebook, value: "facebook" },
  Instagram: { icon: GLOBAL_ICONS.instagram, value: "instagram" },
  Tiktok: { icon: GLOBAL_ICONS.tiktok, value: "tiktok" },
};
