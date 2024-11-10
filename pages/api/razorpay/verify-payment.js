import crypto from "crypto";

const paymentVerifier = (
  order_id,
  razorpay_payment_id,
  razorpaySignature,
  secret = process.env.RAZORPAY_KEY_SECRET
) => {
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpaySignature) {
    console.log("Payment not successful");
    return false;
  }

  console.log("Payment is successful");
  return true;
};

export default function verifyPayment(req, res) {
  if (req.method === "POST") {
    try {
      const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;

      const isVerified = paymentVerifier(orderCreationId, razorpayPaymentId, razorpaySignature);

      if (isVerified) {
        console.log("Payment verified");
        res.status(200).json({ isSuccess: true, details: "Success: Your payment has been successfully verified." });
      } else {
        console.error("Payment verification failed");
        res.status(200).json({
            isSuccess: false,
            error: "Verification Failed",
            details: "Payment verification failed. Please check your payment details and try again. If the issue persists, contact support."
        });
    }
    } catch (error) {
      console.error("Error during payment verification:", error);
      res.status(500).json({ isSuccess: false, error: "Internal Server Error", details: "An error occurred while processing your request." });
    }
  } else {
    console.error("Method Not Allowed for Payment Verification. Try again with 'POST'");
    res.status(405).json({ isSuccess: false, error: "Method Not Allowed", details: "Please use the 'POST' method for payment verification." });
  }
}
