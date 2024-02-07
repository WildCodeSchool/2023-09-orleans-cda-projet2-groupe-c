interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function FormContainer({ children, title }: FormContainerProps) {
  return (
    <div className='font-base mt-20 w-full flex-col items-center md:mt-24'>
      <h1 className='text-primary font-title mb-4 text-2xl lg:text-3xl'>
        {title}
      </h1>
      <div className='bg-light text-secondary relative flex min-h-56 flex-col rounded-md px-7 pt-5 text-sm shadow-md lg:text-base'>
        {children}
      </div>
    </div>
  );
}
