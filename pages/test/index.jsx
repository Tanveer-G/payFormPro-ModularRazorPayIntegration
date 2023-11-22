import Loading from "../components/Loader/loading";
import LoadScript from "../components/test/LoadScript";
import OrderId from "../components/test/OrderId";
import ShowRazorpay from "../components/test/ShowRazorpay";
import StoreData from "../components/test/StoreData";
import VerifyPayment from "../components/test/VerifyPayment";

import { useSelector } from "react-redux";
import { selectLoading } from "@/redux/slices/loadingSlice";
import LoadingButton from "../components/test/LoadingButton";

export default function () {
  const isLoading = useSelector(selectLoading);
  return (
    <div className="h-full min-h-screen w-max-full flex flex-col justify-center items-center relative">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        RazorTest{" "}
        <span className="text-blue-600 dark:text-blue-500">Pro</span>
      </h1>
      <p className="font-medium italic text-center">
        "Effortless Testing & Understating the Flow of Razorpay"
      </p>

      <div className="px-5 md:px-20 gap-y-3 flex flex-col xl:flex-row  xl:justify-around xl:items-center my-10">
        <ShowRazorpay />
        <StoreData />
        <OrderId />
        <VerifyPayment />
        <LoadScript />
        <LoadingButton />
      </div>
      {isLoading && (
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          {/* Loading component */}
          <Loading message="Test Mode: Please wait a while..." />
        </div>
      )}
    </div>
  );
}
