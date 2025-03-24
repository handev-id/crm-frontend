import { GLOBAL_ICONS } from "./icons";

export const filteringConversation = [
  { title: "Semua", value: "all" },
  { title: "Ditangani", value: "assigned" },
  { title: "Menunggu", value: "unassigned" },
  { title: "Arsip", value: "archived" },
];

export const settingMenus = [
  { title: "Akun", path: "/settings/account", icon: GLOBAL_ICONS.userSolid },
  {
    title: "Channel",
    path: "/settings/connection",
    icon: GLOBAL_ICONS.connection,
  },
  { title: "Pengguna", path: "/settings/users", icon: GLOBAL_ICONS.userType },
  {
    title: "Notifikasi",
    path: "/settings/notifications",
    icon: GLOBAL_ICONS.notif,
  },
  { title: "ChatBot", path: "/settings/bot", icon: GLOBAL_ICONS.userType },
  {
    title: "Langganan",
    path: "/settings/subscription",
    icon: GLOBAL_ICONS.price,
  },
];

type SettingMenuItem = {
  title: string;
  icon: React.ReactNode;
};

export const settingMenusMap: Record<string, SettingMenuItem> = {
  "/settings/account": { title: "Akun", icon: GLOBAL_ICONS.userSolid },
  "/settings/channels": { title: "Channel", icon: GLOBAL_ICONS.connection },
  "/settings/users": { title: "Pengguna", icon: GLOBAL_ICONS.userType },
  "/settings/notifications": { title: "Notifikasi", icon: GLOBAL_ICONS.notif },
  "/settings/bot": { title: "ChatBot", icon: GLOBAL_ICONS.userType },
  "/settings/subscription": { title: "Langganan", icon: GLOBAL_ICONS.price },
};

export const channelsMap = {
  Whatsapp: { icon: GLOBAL_ICONS.whatsapp },
  Facebook: { icon: GLOBAL_ICONS.facebook },
  Instagram: { icon: GLOBAL_ICONS.instagram },
  Tiktok: { icon: GLOBAL_ICONS.tiktok },
};
