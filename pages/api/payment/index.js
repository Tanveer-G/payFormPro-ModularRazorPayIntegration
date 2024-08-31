import { getPayments, createPayment } from "@/controllers/paymentController";
import { nameRegex, emailRegex, priceRegex } from "@/utils/regexList";
import rateLimit from "@/middleware/rateLimit";
import errorHandler from "@/middleware/errorHandler";

export default async function handler(req, res) {
  try {
    // Apply rate limit middleware to limit the number of accesses
    await rateLimit(req, res, async () => {
      const { method } = req;
      switch (method) {
        case "GET":
          await getPayments(res); // Pass req and res to controller function but I passed only response
          break;
        case "POST":
          const { name, email, price, currency } = req.body;
          const priceNum = Number(price);
          if (
            !nameRegex.test(name) ||
            !emailRegex.test(email) ||
            !priceRegex.test(priceNum) ||
            !["INR", "USD"].includes(currency)
          ) {
            return res
              .status(422)
              .json({ error: "Invalid form data. Please check your input." });
          }
          await createPayment(req.body, res); // Pass req (data) and res to controller function
          break;
        default:
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).json({ error: `Method ${method} Not Allowed` });
          break;
      }
    });
  } catch (error) {
    // console.error("Error:", error);
  // res.status(500).json({ message: "Internal Server Error" });
    errorHandler(res, error);
  }
}
