// Global styles
import "@/styles/globals.css";

// Third-party libraries
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

// Redux store
import { store } from "@/redux/store";

// Layout components
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Navbar";

// Import toast styles
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/Loader/loading";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <div className="w-full h-full relative">
           <Navbar />
           <Component {...pageProps} />
           <Footer />
           <ToastContainer /> {/* Add ToastContainer here */}
           <Loading message="Please wait a while..." />
        </div>
      </Provider>
      <Analytics />
    </>
  );
}
