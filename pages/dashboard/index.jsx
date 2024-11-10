import BrandHeader from "@/components/Layout/BrandHeader";
import PaymentsTable from "@/components/PaymentsTable";

export default function Dashboard() {
  return (
    <div className="w-full h-full max-h-[800px] flex flex-col justify-center items-center">
      <BrandHeader subtitle={`"Latest 7 Payments from the Last 24 Hours"`}/>
      <PaymentsTable />
    </div>
  );
}
