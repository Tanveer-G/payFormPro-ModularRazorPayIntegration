import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Footer from "./components/Layout/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
    <Analytics />
    </>
  );
}
