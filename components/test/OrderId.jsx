// Redux
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading, selectLoading } from "@/redux/slices/loadingSlice";

// Third-party libraries
import { toast } from 'react-toastify'; 

// Hooks
import useGenerateOrder from "@/hooks/razorpay/useGenerateOrder";

export default function OrderId() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const { generateOrder } = useGenerateOrder();

  const details = {
    name: "Tanveer",
    email: "name@gmail.com",
    price: "313",
    currency: "INR"
  };

  const handler = async () => {
    dispatch(startLoading());

    try {
      const { orderDetails } = await generateOrder(details);
      // console.info("Test Button UI: generated Order ID", orderDetails.id);
      toast.info(`Generated Order ID : ${orderDetails.id}`);
    } catch (error) {
      console.error("Test Button UI: Error generating Order ID:", error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <button
      title="Test: Generate New Order ID"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handler}
    >
      {isLoading? "Generating..." : "Order ID"}
    </button>
  );
}
