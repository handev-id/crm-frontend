import "react-loading-skeleton/dist/skeleton.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "./utils/store";
import { setTheme } from "./utils/store/slices/theme";
import Login from "./pages/login";
import MainLayout from "./pages/layout";
import SettingsLayout from "./pages/settings/layout";
import moment from "moment";
import ConversationsLayout from "./pages/conversation/layout";
import Register from "./pages/register";
import Contacts from "./pages/contacts";
import Account from "./pages/settings/account";
import Channels from "./pages/settings/channels";
import Tenant from "./pages/settings/tenant";
import OfflineMessage from "./components/OfflineMessage";
import Users from "./pages/settings/users";
import AiAgentList from "./pages/settings/ai-agents/list";

const App = () => {
  moment.locale("id");
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (!theme) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const existingTheme = localStorage.getItem("theme") as "light" | "dark";
    if (existingTheme) {
      dispatch(setTheme(existingTheme));
    }
  }, []);

  if (!navigator.onLine) return <OfflineMessage />;

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <ConversationsLayout />,
              children: [
                {
                  path: "conversation",
                  element: <div></div>,
                },
              ],
            },
            {
              path: "contacts",
              element: <Contacts />,
            },
            {
              path: "settings",
              element: <SettingsLayout />,
              children: [
                {
                  path: "tenant",
                  element: <Tenant />,
                },
                {
                  path: "account",
                  element: <Account />,
                },
                {
                  path: "channels",
                  element: <Channels />,
                },
                { path: "users", element: <Users /> },
                {
                  path: "ai-agents",
                  element: <AiAgentList />,
                },
              ],
            },
          ],
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ])}
    />
  );
};

export default App;
