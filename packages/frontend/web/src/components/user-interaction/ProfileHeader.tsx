export default function ProfileHeader({
  handleClick,
  isVisible,
}: {
  readonly handleClick: () => void;
  readonly isVisible: boolean;
}) {
  return (
    <nav className='text-light-medium bg-light-hard flex h-16 items-center justify-around gap-4 px-5 py-3 shadow-md'>
      <button
        type='button'
        onClick={handleClick}
        className={`${
          isVisible ? 'bg-primary text-light-medium' : 'text-secondary'
        } flex grow items-center justify-center rounded-md py-2`}
      >
        <p>{`Profile liked`}</p>
      </button>
      <div className='h-full w-[1px] bg-[#aaaaaa]' />
      <div className='bg-primary flex grow items-center justify-center rounded-md py-2'>
        <p>{`Users liked me`}</p>
      </div>
    </nav>
  );
}
