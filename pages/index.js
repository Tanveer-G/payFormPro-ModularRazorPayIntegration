import { useSelector } from 'react-redux';
import { selectLoading } from '@/redux/slices/loadingSlice';
import Form from './components/Form';
import Loading from './components/Loader/loading';
import BrandHeader from './components/Layout/BrandHeader';

export default function Index() {
  const isLoading = useSelector(selectLoading);

  return (
    <div className="relative z-10">
      <div className="h-full max-h-[800px] w-max-full flex flex-col justify-center items-center relative">
        <BrandHeader/>
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
