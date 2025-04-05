import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { RootState } from "./utils/store";
import { setTheme } from "./utils/store/slices/theme";
import 'react-loading-skeleton/dist/skeleton.css'
import Login from "./pages/login";
import Layout from "./pages/layout";
import LayoutSettings from "./pages/settings/layout";
import moment from "moment";
import Conversations from "./pages/conversations";
import Register from "./pages/register";
import Contacts from "./pages/contacts";
import Account from "./pages/settings/account";
import Channels from "./pages/settings/channels";
import Tenant from "./pages/settings/tenant";
import OfflineMessage from "./components/OfflineMessage";
import Users from "./pages/settings/users";

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
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "conversations",
              element: <Conversations />,
            },
            {
              path: "contacts",
              element: <Contacts />,
            },
            {
              path: "settings",
              element: <LayoutSettings />,
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
              ],
            },
          ],
        },
      ])}
    />
  );
};

export default App;
