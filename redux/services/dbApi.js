import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dbApi = createApi({
  //* Reducer path assigned for the dbApi slice
  reducerPath: "dbApi", //! reducerPath: "dbApiPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    // Existing endpoints
    getEntries: builder.query({
      query: () => "entries/entries",
    }),
    postEntry: builder.mutation({
      query: (formData) => ({
        url: "entries/entries",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetEntriesQuery, usePostEntryMutation } = dbApi;
