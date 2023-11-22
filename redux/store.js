import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dbApi } from "./services/dbApi";
import { razorpayApi } from "./services/razorpayAPI";
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    //* Associating the reducer path with the corresponding reducer for dbApi, or razorpayApi
    [dbApi.reducerPath]: dbApi.reducer, //* [dbApiPath.reducerPath]: dbApiPath.reducer,
    [razorpayApi.reducerPath]: razorpayApi.reducer, //* razorpayApiPath.reducerPath:"razorpayApi.reducer",
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    dbApi.middleware, //*dbApiPath.middleware
    razorpayApi.middleware,  //*razorpayApiPath.middleware
  ], 
});

//*  automatically dispatching updates to store when data changes due to API calls.
setupListeners(store.dispatch);
