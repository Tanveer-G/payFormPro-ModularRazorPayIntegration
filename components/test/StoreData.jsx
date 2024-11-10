import useStoreFormData from "@/hooks/database/useStoreFormData";

export default function StoreData() {
  const { storeFormData } = useStoreFormData();

  const details = {
    name: "tanveer",
    email: "name@gmail.com",
    price: "313",
    currency: "INR",
    developerName: "tanveer",
  };
  const data = {
    id: "order_N2dvb0Ni1ogR0c",
    amount: "31300",
    receipt: "receipt_number_01",
    status: "loading",
  };
  const detailedData = { ...details, ...data };

  const handler = () => {
    // console.info("connecting to DB for storing data.");
    storeFormData(detailedData);
  };

  return (
    <button
      title="Test: Store form data in the server"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handler}
    >
      Store Data
    </button>
  );
}
