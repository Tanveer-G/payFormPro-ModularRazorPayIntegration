import { useSelector } from 'react-redux';
import { selectLoading } from '@/redux/slices/loadingSlice';
import Form from './components/Form';
import Loading from './components/Loader/loading';

export default function Index() {
  const isLoading = useSelector(selectLoading);

  return (
    <div className="relative z-10">
      <div className="h-full min-h-screen w-max-full flex flex-col justify-center items-center relative">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          PayForm <span className="text-blue-600 dark:text-blue-500">Pro</span>
        </h1>
        <p className="font-medium italic">"Effortless Form & Payment Integration"</p>
        <Form />
      </div>
      {/* Overlay to prevent interactions */}
      {isLoading && (
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          {/* Loading component */}
          <Loading message="Please wait a while..." />
        </div>
      )}
    </div>
  );
}
