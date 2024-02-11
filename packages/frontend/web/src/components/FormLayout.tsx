export default function FormLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='h-full w-full'>
      <div className='mx-auto flex h-full w-full max-w-[500px] flex-col justify-between'>
        {children}
      </div>
    </div>
  );
}
