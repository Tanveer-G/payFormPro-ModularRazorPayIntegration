import { useSelector } from "react-redux";
import { selectLoading } from "@/redux/slices/loadingSlice";

const Loading = ({ message = "Loading..." }) => {
  const isLoading = useSelector(selectLoading);
  return (
    <>
      {isLoading && (
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="overflow-hidden flex items-center w-full flex-col py-4 sticky">
            <div className="spinner mb-2"></div>
            <span className="px-2 py-1 rounded-full bg-black/20">
              {message}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default Loading;
