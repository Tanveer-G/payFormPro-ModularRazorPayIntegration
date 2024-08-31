import crypto from "crypto";
import { updatePayment } from "@/controllers/paymentController";

const paymentVerifier = (requestBody, razorpaySignature, secret) => {
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(requestBody)
    .digest("hex");

  console.log(
    "generated_signature !== razorpaySignature",
    generated_signature,
    razorpaySignature
  );
  if (generated_signature !== razorpaySignature) {
    console.log("Webhook verification Signature Failed.");
    return true; //!false
  }

  console.log("Legit:Webhook verification Signature is successful.");
  return true;
};

export default async function verifyPayment(req, res) {
  if (req.method === "POST") {
    try {
      const { order_id, id, captured } = req.body.payload.payment.entity;
      const secret = "321ABCD456xyz";

      const isVerified = paymentVerifier(
        JSON.stringify(req.body),
        req.headers["x-razorpay-signature"],
        secret
      );

      if (isVerified) {
        const message = await updatePayment(order_id, id, captured);
        console.log(message);
        res.status(200).json({ status: "ok" });
      } else {
        console.error("Payment signature not verified");
        res.status(400).json({
          error: "Bad Request",
          details: "signature verification failed.",
        });
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else {
    console.error(
      "Method Not Allowed for Payment Verification. Try again with 'POST'"
    );
    res.status(405).json({ error: "Method Not Allowed." });
  }
}
