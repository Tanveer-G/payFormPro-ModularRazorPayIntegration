import Link from "next/link";
import { useGetPaymentsQuery } from "@/redux/services/dbApi";
import Loading from "./Loader/loading";

const tableHead = [
  "S.No.",
  "Name & Email",
  "Date",
  "Amount",
  "Status",
  "V-WebHook",
];

export default function PaymentsTable() {
  const { data, isLoading, isSuccess, isError } = useGetPaymentsQuery();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container my-4">
      {/* table start */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHead.map((item) => (
              <th scope="col" className="p-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          )}

          {isSuccess &&
            data &&
            data.map(
              (
                {
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
        isSuccess && data.length === 0 && <p>"Oops! No transactions found. How about starting one <Link href={'/'} className="font-semibold underline italic">now?"</Link></p>
      }

      {
        isError && <p>We apologize for the inconvenience. We're currently facing an unexpected issue. Please try again later.</p>
      }
    </div>
  );
}
