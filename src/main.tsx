import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmModal from "./components/modal/confirm";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <Toaster />
      <ConfirmModal />
      <App />
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
