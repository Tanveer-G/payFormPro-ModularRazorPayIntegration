import { toast } from 'react-toastify';
import useStoreFormData from "@/hooks/database/useStoreFormData";
import useValidatePayment from "./useValidatePayment";
import useLoadScript from "./useLoadScript";

const useDisplayRazorpay = () => {
  const { storeFormData } = useStoreFormData();
  const { validatePayment } = useValidatePayment();
  const loadScript = useLoadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  const displayRazorpay = async (details) => {

    // Load Razorpay script
    try {
      await loadScript();
      console.log("Razorpay SDK/Script loaded successfully!");
      // toast.success("Razorpay SDK/Script loaded successfully!");
    } catch (error) {
      console.error("Failed to load Razorpay SDK/Script:", error);
      // alert(
      //   "Razorpay SDK failed to load. Please check your internet connection and try again."
      // );
      toast.error("Failed to load the Razorpay SDK. Please check your internet connection and try again. If the issue persists, please contact support.");

      return;
    }

    try {
      const {
        name,
        email,
        price,
        id: order_id,
        amount,
        currency,
      } = details;

      const options = {
        key: process.env.NEXT_PUBLIC_KEY,
        amount: Number(amount) || Number(price) * 100,
        currency: currency,
        name: "Tanveer H. Developer",
        description: "https://tanveer-portfolio.vercel.app/en-US",
        order_id,
        handler: async function (response) {
          const paymentData = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          // storing all data in DB
          const detailedData = { ...details, ...paymentData }
          storeFormData(detailedData);
          // Verify the Razorpay payment
          await validatePayment(paymentData); //validatePayment or verify-payment
        },
        prefill: {
          name: name,
          email: email,
          contact:7007111777,
        },
        notes: {
          developer: "TANVEER H.",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      // Razorpay popup
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(
        "useDisplayRazorpay Error: Razorpay popup unable to load",
        error
      );
      // alert("Error Razorpay popup unable to load. Please try again later.");
      toast.error("Razorpay popup could not load. Please check your internet connection and try again. If the issue persists, contact support.");
    }
  };

  return { displayRazorpay };
};

export default useDisplayRazorpay;
