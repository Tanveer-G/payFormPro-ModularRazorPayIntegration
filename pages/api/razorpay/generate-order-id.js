import Razorpay from "razorpay";
import shortid from "shortid";
import { nameRegex, emailRegex, priceRegex } from "@/utils/regexList";

export default async function generateOrderID(req, res) {
  if (req.method === "POST") {

    // Destructure price and currency from the request body
    const { name, email, price, currency } = req.body;

    console.log("generate order id api", req.body)

    const priceNum= Number(price);
    if (
      !nameRegex.test(name) ||
      !emailRegex.test(email) ||
      !priceRegex.test(priceNum) ||
      !["INR", "USD"].includes(currency)
    ) {
      // 422 Unprocessable Entity: Invalid form data
      return res
        .status(422)
        .json({ error: "Invalid form data. Please check your input." });
    }

    try {
      // Initialize Razorpay object
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Define a currency conversion
      const conversionFactor =
        currency === "USD" ? (priceNum + 1) * 100 : priceNum * 100;

      const options = {
        amount: conversionFactor,
        currency: currency,
        receipt: shortid.generate() + Date.now(),
      };

      // Create the order using Razorpay
      const response = await razorpayInstance.orders.create(options);

      // Send the order details to the front-end
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        receipt: response.receipt,
        status: response.status,
      });

      console.log("Order ID generated successfully:", response.id);
    } catch (error) {
      console.error("Error while generating order ID:", error);
      res
        .status(500)
        .json({ error: "Internal server error.", details: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed." });
  }
}
