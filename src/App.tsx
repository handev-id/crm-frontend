import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "./utils/store";
import { setIsDarkMode } from "./utils/store/slices/theme";
import Login from "./pages/login";
import Layout from "./pages/layout";
import LayoutSettings from "./pages/settings";
import moment from "moment";
import Conversations from "./pages/conversations";
import Register from "./pages/register";
import Contacts from "./pages/contacts";
import Account from "./pages/settings/account";
import Channels from "./pages/settings/channels";

const App = () => {
  moment.locale("id");
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(setIsDarkMode(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(setIsDarkMode(false));
    }
  }, [theme]);

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
                  path: "account",
                  element: <Account />,
                },
                {
                  path: "channels",
                  element: <Channels />,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
};

export default App;
