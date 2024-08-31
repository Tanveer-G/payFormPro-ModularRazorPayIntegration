import useValidatePayment from "./useValidatePayment";
import useLoadScript from "./useLoadScript";
import useStoreFormData from "../database/useStoreFormData";

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
      console.log("Script loaded Successfully");
    } catch (error) {
      console.error("Failed to load Razorpay SDK/Script:", error);
      alert(
        "Razorpay SDK failed to load. Please check your internet connection and try again."
      );
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
        receipt,
        status,
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
          contact:9876123450,
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
    } catch (orderIDError) {
      console.error(
        "useDisplayRazorpay Error: Razorpay popup unable to load",
        orderIDError
      );
      alert("Error Razorpay popup unable to load. Please try again later.");
    }
  };

  return { displayRazorpay };
};

export default useDisplayRazorpay;
