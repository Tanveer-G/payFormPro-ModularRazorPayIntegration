// Redux
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading, selectLoading } from "@/redux/slices/loadingSlice";

// Third-party libraries
import { toast } from 'react-toastify'; 

// Hooks
import useLoadScript from "@/hooks/razorpay/useLoadScript";
export default function LoadScript() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const loadScript = useLoadScript('https://checkout.razorpay.com/v1/checkout.js');

    const handler = async () => {
        dispatch(startLoading()); // Start loading

        try {
            await loadScript();
            // console.info('Test Button UI: Script loaded successfully');
            toast.success('Script loaded successfully!');
        } catch (error) {
            console.error('Test Button UI: Failed to load script:', error);
            toast.error('Script failed to load. Please check your internet connection and try again.'); // Error message
        } finally {
            dispatch(stopLoading()); 
        }
    };

    return (
        <button
            title="Test: Load Default Razorpay Checkout Script"
            className="border-2 rounded-xl border-white px-4 py-2"
            onClick={handler}
            disabled={isLoading} // Disable button while loading
        >
            {isLoading ? 'Loading...' : 'Load Script'} {/* Change button text based on loading state */}
        </button>
    );
}
