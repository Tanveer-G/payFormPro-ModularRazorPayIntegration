import { useVerifyPaymentMutation } from "@/redux/services/razorpayAPI";

export default function useValidatePayment() {
const [verifyPayment] = useVerifyPaymentMutation();
  
    const validatePayment = async (paymentDetails) => {
        try {
          console.log("Payment Verification started");
          const {data} = await verifyPayment(paymentDetails);
          alert(data.message); // verification Result 
          console.log("Success: Payment verified");
        } catch (verificationError) {
          console.error("Error: Razorpay payment verification unsuccessful:", verificationError);
          alert("Error: Verification unsuccessful. Please contact support.");
        }
      };
  
    return {validatePayment}
}
