import { toast } from 'react-toastify';
import { useCreatePaymentMutation } from "@/redux/services/dbApi";

const useStoreFormData = () => {
  const [createPayment] = useCreatePaymentMutation();
  const storeFormData = async (userOrderDetails, isFormValid = true) => {

    if (isFormValid) {
      try {
        const {data} = await createPayment(userOrderDetails);
        // console.info(data.message, userOrderDetails);
        toast.info("Data has been successfully stored in the database.");
      } catch (error) {
        console.error(
          "Error: Failed to store data in DB. Server not responding or invalid details",
          error.message
        );
        toast.error("Failed to store data. Please try again.");
      }
    } else {
      console.warn("Form not submitted. Please fix validation errors.");
      toast.warn("Form not submitted. Please fix validation errors.");
    }
  };
  return { storeFormData };
};

export default useStoreFormData;
