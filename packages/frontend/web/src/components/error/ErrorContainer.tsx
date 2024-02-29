export default function ErrorContainer({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='bg-medium flex h-screen w-full items-center justify-center px-5'>
      <div className='bg-light-hard h-2/3 w-full max-w-[800px] rounded-lg px-5 shadow-md'>
        {children}
      </div>
    </div>
  );
}
