import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const razorpayApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  //* Reducer path assigned for the razorpayApi slice
  reducerPath: "razorpayApi", //! reducerPath: "razorpayApiPath",
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (initialFormData) => ({
        url: "razorpay/generate-order-id",
        method: "POST",
        body: initialFormData,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (paymentDetails) => ({
        url: "razorpay/verify-payment",
        method: "POST",
        body: paymentDetails,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = razorpayApi;
