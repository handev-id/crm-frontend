import logo from "../../assets/images/logo.png";

export const useNotification = () => {
  const notify = (title: string, options: NotificationOptions) => {
    if (Notification.permission === "granted") {
      new Notification(title, { ...options, icon: logo });
    }
  };
  return { notify };
};
