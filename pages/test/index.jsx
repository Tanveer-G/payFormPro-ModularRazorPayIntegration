// Layout components
import BrandHeader from "@/components/Layout/BrandHeader";

// Loader components
import LoadingButton from "@/components/test/LoadingButton";

// Test components
import LoadScript from "@/components/test/LoadScript";
import OrderId from "@/components/test/OrderId";
import ShowRazorpay from "@/components/test/ShowRazorpay";
import StoreData from "@/components/test/StoreData";
import VerifyPayment from "@/components/test/VerifyPayment";

export default function () {

  return (
    <div className="w-full h-full max-h-max lg:min-h-[calc(100vh-30vh)] flex flex-col items-center relative">
      <BrandHeader
        heading="RazorTest"
        subtitle={`"Effortless Testing & Understating the Flow of Razorpay"`}
      />
      <div className="px-5 md:px-20 gap-y-3 flex flex-col xl:flex-row  xl:justify-around xl:items-center my-10 xl:gap-x-3">
        <ShowRazorpay />
        <StoreData />
        <OrderId />
        <VerifyPayment />
        <LoadScript />
        <LoadingButton />
      </div>
    </div>
  );
}
