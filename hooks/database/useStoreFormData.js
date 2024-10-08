import { useCreatePaymentMutation } from "@/redux/services/dbApi";

const useStoreFormData = () => {
  const [createPayment] = useCreatePaymentMutation();
  const storeFormData = async (userOrderDetails, isFormValid = true) => {

    if (isFormValid) {
      try {
        const {data} = await createPayment(userOrderDetails);
        console.log(data.message, userOrderDetails);
      } catch (error) {
        console.error(
          "Error: Failed to store data in DB. Server not responding or invalid details",
          error.message
        );
      }
    } else {
      console.error("Form not submitted. Please fix validation errors.");
    }
  };
  return { storeFormData };
};

export default useStoreFormData;
