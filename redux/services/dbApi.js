import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dbApi = createApi({
  //* Reducer path assigned for the dbApi slice
  reducerPath: "dbApi", //! reducerPath: "dbApiPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "payment",
    }),
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "payment",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useGetPaymentsQuery, useCreatePaymentMutation } = dbApi;
