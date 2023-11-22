import { useState } from "react";
import { useCreateOrderMutation } from "@/redux/services/razorpayAPI";
const useGenerateOrder = () => {
  const [createOrder] = useCreateOrderMutation();
  const [orderDetails, setOrderDetails] = useState(null);

  const generateOrder = async (initialFormData) => {
    try {
      const { data } = await createOrder(initialFormData);
      const orderDetails = {
        id: data.id,
        currency: data.currency,
        amount: data.amount,
        receipt: data.receipt,
        status: data.status,
      };

      setOrderDetails(orderDetails);

      console.log("Order ID generated successfully:", orderDetails);

      return { orderDetails };
    } catch (error) {
      console.error("Error generating order ID:", error);
    }
  };

  return { generateOrder, orderDetails };
};

export default useGenerateOrder;
