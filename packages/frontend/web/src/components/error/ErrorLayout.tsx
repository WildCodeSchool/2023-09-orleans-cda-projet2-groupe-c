import Error403 from './Error403';

export default function ErrorContainer() {
  return (
    <div className='bg-medium flex h-screen w-full items-center'>
      <div className='bg-light-hard mx-auto h-2/3 w-1/2 rounded-lg shadow-md'>
        <Error403 />
      </div>
    </div>
  );
}
