import { Schema, model, models } from "mongoose";

const paymentSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email.'],
  },
  price: {
    type: String,
    required: [true, 'Please provide a price.'],
  },
  currency: {
    type: String,
    required: [true, 'Please provide a currency.'],
  },
  amount: {
    type: Number,
    required: true,
  },
  receipt: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  orderCreationId: {
    type: String,
    required: false,
  },
  razorpayPaymentId: {
    type: String,
    required: false,
  },
  razorpayOrderId: {
    type: String,
    required: false,
  },
  razorpaySignature: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Additional timestamps if needed
  paymentCompletionTime: Date,
  paymentVerificationTime: Date,
  orderCreationTime: Date,
  lastUpdateTime: Date,
});

const Payment = models.paymentdetails || model("paymentdetails", paymentSchema);

export default Payment;
