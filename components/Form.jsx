// React
import { useState, useEffect } from "react";

// Redux
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slices/loadingSlice';

// Third-party libraries
import { toast } from 'react-toastify'; 

// Utilities
import { nameRegex, emailRegex, priceRegex } from "@/utils/regexList";

// Hooks
import useProceedToPayment from "@/hooks/razorpay/useProceedToPayment";

// Components
import FormIcon from "./FormIcon";

const initialFormValidation = {
  name: null,
  email: null,
  price: null,
  currency: "INR", // Default currency
};
const initialFormData = {
  name: "",
  email: "",
  price: "",
  currency: "INR", // Default currency
};

export default function Form() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isValid, setIsValid] = useState(initialFormValidation);
  // *Hooks start from here
  const { proceedToPayment } = useProceedToPayment();

  //* validation of form Data Start here
  useEffect(() => {
    const { name, email, price } = formData;

    const updatedValidation = {
      name: nameRegex.test(name),
      email: emailRegex.test(email),
      price: priceRegex.test(price),
      currency: formData.currency, // No validation for currency in this example
    };
    setIsValid(updatedValidation);
  }, [formData]);

  const isFormValid =
    isValid.name !== null &&
    isValid.email !== null &&
    isValid.price !== null &&
    isValid.name &&
    isValid.email &&
    isValid.price;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      try {
        dispatch(startLoading());
        await proceedToPayment(formData);
      } catch (error) {
        console.error("Error during payment process:", error);
      }finally {
        dispatch(stopLoading());
      }
    } else {
      console.warn("Form submission failed due to validation errors.");
      toast.warn("Submission failed. Please correct the details and try again.");
    }
  };

  return (
    <main className="p-3 container xl:px-16">
      <form>
        {/* name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className={`block mb-2 text-sm font-semibold ${
              isValid.name
                ? "text-green-700 dark:text-green-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            Name:
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FormIcon
                name="user"
                className="text-gray-500 dark:text-gray-400"
              />
            </span>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Nice Name"
            />
          </div>
          {!isValid.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span> Please Enter your
              correct name
            </p>
          )}
        </div>

        {/* email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className={`block mb-2 text-sm font-semibold ${
              isValid.email
                ? "text-green-700 dark:text-green-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            Email:
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FormIcon
                name="email"
                className="text-gray-500 dark:text-gray-400"
              />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Professional Email"
            />
          </div>
          {!isValid.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span> Email is not valid!
            </p>
          )}
        </div>

        {/* Price  */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className={`block mb-2 text-sm font-semibold ${
              isValid.price
                ? "text-green-700 dark:text-green-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            Price:
          </label>
          <div className="flex">
            <span className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <span className="w-4 text-2xl pt-1 font-semibold h-full text-gray-500 dark:text-gray-400">
                {formData.currency === "USD" ? "$" : "₹"}
              </span>
            </span>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleInputChange}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Amount"
            />
          </div>

          {!isValid.price && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>Any Amount bigger than
              0
            </p>
          )}
        </div>

        {/* currency BOX */}
        <div className="mb-2">
          <fieldset>
            <legend className="sr-only">Select Currency</legend>

            <div className="flex items-center mb-4">
              <input
                id="currency-option-INR"
                defaultChecked={true}
                type="radio"
                name="currency"
                value="INR"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onClick={handleInputChange}
              />
              <label
                htmlFor="currency-INR"
                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                &#8377; Indian Rupee
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="currency-option-USD"
                type="radio"
                name="currency"
                value="USD"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onClick={handleInputChange}
              />
              <label
                htmlFor="currency-USD"
                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                &#36; United States Dollar
              </label>
            </div>
          </fieldset>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className={`relative text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-4 py-2 text-center bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          disabled={!isFormValid}
          onClick={handlePay}
        >
          <span className={`${isFormValid ? "text-white" : "text-gray-500"}`}>
            Pay Now!
          </span>
          {!isFormValid && (
            <span className="absolute right-0.5 top-0.5 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>
      </form>
    </main>
  );
}
