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

      console.log("Form submitted and payment process Started:", orderDetails);
    } catch (error) {
      console.error("Error unable to process your payment request:", error);
    }
  };

  return { proceedToPayment };
};

export default useProceedToPayment;
