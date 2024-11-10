import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { toast } from 'react-toastify';
import { useVerifyPaymentMutation } from "@/redux/services/razorpayAPI";

export default function useValidatePayment() {
    const router = useRouter(); // Initialize the router
    const [verifyPayment] = useVerifyPaymentMutation();
    const timerRef = useRef(null); // Ref to hold the timer ID

    const validatePayment = async (paymentDetails) => {
        try {
            const { data } = await verifyPayment(paymentDetails);
            if (data.isSuccess) {
                toast.success(data.details); // Handle success message
            } else {
                toast.error(data.details); // Handle error message
            }
            console.info(data.details);
        } catch (error) {
            console.error("Error: Razorpay payment verification unsuccessful:", error);
            toast.error("Verification unsuccessful. Please check your details and try again. If the issue persists, contact support.");
        } finally {
            toast.info("Redirecting to the Dashboard for your transaction history and Razorpay webhook verification."); // Info message

            // Redirect to the dashboard 
            timerRef.current = setTimeout(() => {
                router.push('/dashboard');
            }, 3000); 
        }
    };

    // Cleanup function to clear the timer if the component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return { validatePayment };
}
