export default function ProfileHeader({
  handleClick,
  isVisible,
}: {
  readonly handleClick: (button: 'profileLiked' | 'usersLikedMe') => void;
  readonly isVisible: boolean;
}) {
  return (
    <nav className='text-light-medium bg-light-hard flex h-16 items-center justify-around gap-4 px-4 py-3 shadow-md lg:mx-5 lg:mt-16 lg:rounded-lg'>
      <button
        type='button'
        onClick={() => {
          handleClick('profileLiked');
        }}
        className={`${
          isVisible ? 'bg-primary text-light-medium' : 'text-primary'
        } border-primary flex grow items-center justify-center rounded-md border py-2`}
      >
        <p>{`Profile liked`}</p>
      </button>
      <div className='h-full w-[1px] bg-[#aaaaaa]' />
      <button
        type='button'
        onClick={() => {
          handleClick('usersLikedMe');
        }}
        className={`${
          isVisible ? 'text-primary' : 'bg-primary text-light-medium'
        } border-primary flex grow items-center justify-center rounded-md border py-2`}
      >
        <p>{`Users liked me`}</p>
      </button>
    </nav>
  );
}
