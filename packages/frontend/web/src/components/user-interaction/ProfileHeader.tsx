export default function ProfileHeader({
  handleClick,
  isVisible,
}: {
  readonly handleClick: (button: 'profileLiked' | 'usersLikedMe') => void;
  readonly isVisible: boolean;
}) {
  return (
    <nav className='text-light-medium bg-light-hard z-50 flex h-16 items-center justify-between gap-4 px-4 py-3 shadow-md'>
      <div className='mx-auto flex h-full w-full items-center justify-between gap-4 lg:max-w-[1000px]'>
        <button
          type='button'
          onClick={() => {
            handleClick('profileLiked');
          }}
          className={`${
            isVisible ? 'bg-primary text-light-medium' : 'text-primary'
          } border-primary flex w-full items-center justify-center rounded-md border py-2`}
        >
          <p>{`Profile liked`}</p>
        </button>
        <div className='bg-divider h-full w-[1px]' />
        <button
          type='button'
          onClick={() => {
            handleClick('usersLikedMe');
          }}
          className={`${
            isVisible ? 'text-primary' : 'bg-primary text-light-medium'
          } border-primary flex w-full items-center justify-center rounded-md border py-2`}
        >
          <p>{`Users liked me`}</p>
        </button>
      </div>
    </nav>
  );
}
