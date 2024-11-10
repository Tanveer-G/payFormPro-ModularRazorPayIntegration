import BrandHeader from '@/components/Layout/BrandHeader';
import Form from '@/components/Form';

export default function Index() {

  return (
      <div className="w-full h-full max-h-[800px] w-max-full flex flex-col justify-center items-center relative z-10">
        <BrandHeader/>
        <Form />
      </div>
  );
}
