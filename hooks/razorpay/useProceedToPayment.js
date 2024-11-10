import { toast } from 'react-toastify';
import useGenerateOrder from "./useGenerateOrder";
import useDisplayRazorpay from "./useDisplayRazorpay";

const useProceedToPayment = () => {
  const { generateOrder } = useGenerateOrder();
  const { displayRazorpay } = useDisplayRazorpay(); // RazorPay payment popup and verification
  const proceedToPayment = async (formData) => {
    try {
      // Generate Order ID and related details
      const { orderDetails } = await generateOrder(formData);

      let details = { ...formData, ...orderDetails };
      // Display Razorpay Popup and Verify Payment
      await displayRazorpay(details);

      // console.log("Form submitted and payment process Started:", orderDetails);
      toast.success("Your payment process has started successfully! Please complete the transaction in the Razorpay popup.");
    } catch (error) {
      console.error("Error unable to process your payment request:", error);
      toast.error("We were unable to process your payment request. Please check your internet connection and try again. If the problem persists, contact support for further assistance.");
    }
  };

  return { proceedToPayment };
};

export default useProceedToPayment;
