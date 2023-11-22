import useGenerateOrder from "@/hooks/razorpay/useGenerateOrder";

export default function OrderId() {
  const { generateOrder } = useGenerateOrder();

    const details = {
        "name": "Tanveer",
        "email": "name@gmail.com",
        "price": "313",
        "currency": "INR"
      };

      const handler = async () => {
        const { orderDetails } = await generateOrder(details);
        console.log("Test Button UI: generate Order ID", orderDetails)
      };

      return (
        <button title="Test: Generate New Order ID"
          className="border-2 rounded-xl border-white px-4 py-2"
          onClick={handler}
        >
          Order ID
        </button>
      )
}
