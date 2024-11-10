import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

export default function LoadingButton() {
  const dispatch = useDispatch();
  const timeoutRef = useRef(null); // Create a ref for the timeout

  const handleStartLoading = () => {
    dispatch(startLoading());
    
    // Set a timeout to stop loading after 7 seconds
    timeoutRef.current = setTimeout(() => {
      dispatch(stopLoading());
    }, 7000);
  };

  // Cleanup the timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, []);

  return (
    <button
      title="Test: (7 seconds) Loading Demo"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handleStartLoading}
    >
      7 Seconds Loading
    </button>
  );
}
