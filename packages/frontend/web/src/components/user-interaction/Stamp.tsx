interface StampProps {
  readonly children: React.ReactNode;
  readonly className: string;
}

export default function Stamp({ children, className }: StampProps) {
  return (
    <div
      className={`${className} font-title flex rotate-12 items-center justify-center rounded-lg border-4 px-4 py-2 text-center uppercase shadow-md`}
    >
      <p className='font-semibolds translate-y-[2px] text-[5vw] md:text-3xl'>
        {children}
      </p>
    </div>
  );
}
