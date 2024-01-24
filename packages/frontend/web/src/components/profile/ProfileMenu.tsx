import PenIcon from '../icons/PenIcon';

export default function ProfileMenu({
  icon,
  children,
  isEmpty,
}: {
  readonly icon: React.ReactNode;
  readonly children: React.ReactNode;
  readonly isEmpty?: boolean;
}) {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div className='bg-light flex h-16 items-center justify-between pr-4 shadow-md'>
      <div className='flex h-full items-center gap-4 overflow-hidden'>
        <div
          className={`${
            Boolean(isEmpty) ? 'bg-primary' : 'bg-success'
          }  h-full w-1`}
        />
        <div className='flex items-center gap-2'>
          {icon}
          <p className='text-secondary flex translate-y-[1px] items-center truncate'>
            {children}
          </p>
        </div>
      </div>
      <PenIcon
        className='fill-secondary h-5 w-5 cursor-pointer'
        onClick={handleClick}
      />
    </div>
  );
}
