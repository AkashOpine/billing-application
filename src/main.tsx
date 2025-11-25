import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import LoadingModal from "./Components/Loading/LoadingModal.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { BaseName } from "./Config/BaseUrl.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={BaseName}>
        <App />
        <LoadingModal />
      </BrowserRouter>
    </Provider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
