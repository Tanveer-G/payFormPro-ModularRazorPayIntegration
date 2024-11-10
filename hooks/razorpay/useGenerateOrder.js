import { useState } from "react";
import { toast } from 'react-toastify';
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

      // console.info("Order ID generated successfully:", orderDetails);
      toast.success('Order ID generated successfully.'); 
      return { orderDetails };
    } catch (error) {
      console.error("Error generating order ID:", error);
      toast.error("Unable to generate Order ID. Please try again, and if the issue persists, contact support.");
    }
  };

  return { generateOrder, orderDetails };
};

export default useGenerateOrder;
