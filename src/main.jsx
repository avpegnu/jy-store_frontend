import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import ShopContextProvider from "./context/ShopContext.jsx";
// import Header from "./components/HeaderComponent/Header.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </HelmetProvider>
);
