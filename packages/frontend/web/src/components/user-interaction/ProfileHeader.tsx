export default function ProfileHeader({
  handleClick,
  isVisible,
}: {
  readonly handleClick: () => void;
  readonly isVisible: boolean;
}) {
  return (
    <nav className='text-light-medium bg-light-hard flex h-16 items-center justify-around gap-4 px-4 py-3 shadow-md lg:mx-5 lg:mt-16 lg:rounded-lg'>
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
      <button
        type='button'
        onClick={handleClick}
        className={`${
          isVisible ? 'text-secondary' : 'bg-primary text-light-medium'
        } flex grow items-center justify-center rounded-md py-2`}
      >
        <p>{`Users liked me`}</p>
      </button>
    </nav>
  );
}
