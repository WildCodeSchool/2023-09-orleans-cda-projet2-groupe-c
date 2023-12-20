interface BulletBaseProps {
  readonly id?: string;
  readonly children: React.ReactNode;
  readonly lgHidden?: boolean;
}

export default function BulletBase({
  id,
  children,
  lgHidden,
}: BulletBaseProps) {
  return (
    <div
      key={id}
      className={`flex items-center px-1 md:px-2 lg:px-24 ${
        lgHidden ?? false ? 'lg:hidden' : ''
      }`}
    >
      <div className='bg-light active:shadow-divider-dark flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner md:h-10 md:w-10'>
        {children}
      </div>
    </div>
  );
}
