import connectToDB from "@/utils/lib/connectToDB";
import Payment from "@/models/payment.model";
import { errorHandler } from "@/middleware/errorHandler";

// export async function getPayments(res) {
//   try {
//     await connectToDB();
//     const payments = await Payment.find()
//     .sort({ createdAt: -1 })  // Sort in descending order
//     .limit(7);                // Limit to 7 records
//     res.status(200).json(payments);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// }

export async function getPayments(res) {
  try {
    await connectToDB();

    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const payments = await Payment.find({
      createdAt: { $gte: twentyFourHoursAgo } // Filter payments created in the last 24 hours
    })
      .sort({ createdAt: -1 })  // Sort in descending order
      .limit(7);                // Limit to 7 records

    res.status(200).json(payments);
  } catch (error) {
    errorHandler(res, error);
  }
}

// Add a new payment
export async function createPayment(data, res) {
  try {
    await connectToDB();
    const newPayment = await Payment.create(data);
    res.status(201).json(newPayment);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function updatePayment(
  razorpayOrderId,
  razorpayPaymentId,
  captured
) {
  try {
    await connectToDB();
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        razorpayOrderId,
        razorpayPaymentId,
        isVerified: false,
      },
      { $set: { isVerified: captured } },
      { new: true }
    );
    if (!updatedPayment) {
      return { message: "Payment not found or already verified" };
    }
    return { message: "Payment verified and saved" };
  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error" };
  }
}
