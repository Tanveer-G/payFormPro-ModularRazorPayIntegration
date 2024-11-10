// Next.js components
import { useEffect } from "react";
import Link from "next/link";

// Redux
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

import { toast } from 'react-toastify';

// Redux services
import { useGetPaymentsQuery } from "@/redux/services/dbApi";

const tableHead = [
  "S.No.",
  "Name & Email",
  "Date",
  "Amount",
  "Status",
  "V-WebHook",
];

export default function PaymentsTable() {
  const dispatch = useDispatch();
  // dispatch(startLoading());
  const { data, isLoading, isSuccess, isError } = useGetPaymentsQuery();
  // console.log("🚀 ~ PaymentsTable ~ data:", data)
  
    // Handle loading state
    useEffect(() => {
      if (isLoading) {
        dispatch(startLoading());
      } else {
        dispatch(stopLoading());
      }
    }, [isLoading, dispatch]);

  // Show toast notifications based on query result
  useEffect(() => {
    if (isSuccess) {
      if (data?.length === 0) {
        toast.warn("No transactions found.");
      } else {
        toast.success("Payments loaded successfully!");
      }
    }
    
    if (isError) {
      toast.error("Error loading payments. Please try again later.");
    }
  }, [isSuccess, isError]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container my-4">
      {/* table start */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHead?.map((item) => (
              <th key={`table-header-name-${item}`} scope="col" className="p-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {isSuccess &&
            data?.map(
              (
                {
                  _id,
                  name,
                  email,
                  currency,
                  amount,
                  status,
                  isVerified,
                  createdAt,
                },
                i
              ) => (
                <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">{i + 1}.</td>
                  <th
                    scope="row"
                    className="flex flex-col px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="text-base font-semibold">{name}</div>
                    <div className="font-normal text-gray-500">{email}</div>
                  </th>
                  <td className="px-6 py-4">{createdAt?.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    {currency === "USD" ? <b>&#36;</b> : <b>&#8377;</b>}
                    {amount / 100}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 " />
                      {status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 capitalize" />
                      {isVerified ? "Done" : "Pending"}
                    </div>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>

      {
        isSuccess && data.length === 0 && <p className="flex justify-center my-6">"Oops! No transactions found. How about starting one <Link href={'/'} className="font-semibold underline italic">now?"</Link></p>
      }

      {
        isError && <p className="flex justify-center my-6">We apologize for the inconvenience. We're currently facing an unexpected issue. Please try again later.</p>
      }
    </div>
  );
}
