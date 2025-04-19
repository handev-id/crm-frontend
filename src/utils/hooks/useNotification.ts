import { useEffect, useRef } from "react";
import audioNotif from "../../assets/audio/notification.wav";
import logo from "../../assets/images/logo.png";

export const useNotification = () => {
  const notify = (title: string, options: NotificationOptions) => {
    if (Notification.permission === "granted") {
      new Notification(title, { ...options, icon: logo });
      const audio = new Audio(audioNotif);
      audio.preload = "auto";
      audio.play();
    }
  };
  return { notify };
};
