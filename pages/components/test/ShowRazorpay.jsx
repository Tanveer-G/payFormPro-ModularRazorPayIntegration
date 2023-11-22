import useDisplayRazorpay from "../../../hooks/razorpay/useDisplayRazorpay";

export default function ShowRazorpay() {
  const { displayRazorpay } = useDisplayRazorpay();
   
  const details = {
    "name": "Tanveer",
    "email": "name@gmail.com",
    "price": "313",
    "currency": "INR",
    "id": "order_N2dvb0Ni1ogR0c",
    "amount": "31300",
    "receipt": "receipt_number_01",
    "status": "loading",
    "developerName": "Tanveer H."
  };

  const handler = () => {
    console.log("Test Button UI: Display razorpay")
    displayRazorpay(details);
  };
  return (
    <button title="Test: Display RazorPay PopUp and Verification. Remark:Order_id"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handler}
    >
      Show Razorpay
    </button>
  );
}
