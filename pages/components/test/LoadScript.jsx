import useLoadScript from "@/hooks/razorpay/useLoadScript";


export default function LoadScript() {
    const loadScript = useLoadScript('https://checkout.razorpay.com/v1/checkout.js');

  const handler = async () => {
    try {
        await loadScript();
        console.log('Test Button UI: Script loaded successfully');
        // Additional logic after script is loaded
      } catch (error) {
        console.error('Test Button UI: Failed to load script:', error);
        alert('Script failed to load. Please check your internet connection and try again.');
      }
  };
  return (
    <button
      title="Test: Load Default Razorpay Checkout Script"
      className="border-2 rounded-xl border-white px-4 py-2"
      onClick={handler}
    >
      Load Script
    </button>
  );
}
