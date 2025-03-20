import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/login";
import Layout from "./pages/layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./utils/store";
import { setIsDarkMode } from "./utils/store/slices/theme";
import moment from "moment";
import Conversations from "./pages/conversations";
import Register from "./pages/register";
import Contacts from "./pages/contacts";
import Settings from "./pages/settings";

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
              element: <Settings />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
