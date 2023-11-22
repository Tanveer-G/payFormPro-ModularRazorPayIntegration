import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

export default function LoadingButton() {
  const dispatch = useDispatch();

  const handleStartLoading = () => {
    console.log("click true");
    dispatch(startLoading());
    let timeout = setTimeout(() => {
      dispatch(stopLoading());
      clearTimeout(timeout);
    }, 10000);
  };

  return (
    <button
      title="Test: (10 seconds) Loading Demo"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handleStartLoading}
    >
      Loading Demo
    </button>
  );
}
