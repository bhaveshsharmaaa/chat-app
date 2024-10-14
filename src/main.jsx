import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store.jsx";
import NotFound from "./pages/NotFound.jsx";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material"; // Import CssBaseline

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline /> {/* Add CssBaseline here */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
