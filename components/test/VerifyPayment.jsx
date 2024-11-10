import useValidatePayment from "@/hooks/razorpay/useValidatePayment";

export default function VerifyPayment() {
  const { validatePayment } = useValidatePayment();

  const details = {
     "orderCreationId": "order_N2dloJuZ8bsOXi",
     "razorpayPaymentId": "pay_N2fyk7VklroNQe",
     "razorpaySignature": "56759c05309f1b6b1206eef8d15c92c8d3b79edeb27185445faafc40cb455ac7"
    };

  const handler = () => {
    // console.log('Test UI Button: Validation start.')
    validatePayment(details);
  };

  return (
    <button
      title="Test: Validate and Verify Payment."
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handler}
    >
      Verify Payment
    </button>
  );
}
