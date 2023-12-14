interface Container extends React.HTMLAttributes<HTMLDivElement> {}
export default function FormContainer({ children, title }: Container) {
  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 text-2xl lg:text-3xl'>
        {title}
      </h1>
      <div
        className={`bg-light text-secondary rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base`}
      >
        {children}
      </div>
    </div>
  );
}
