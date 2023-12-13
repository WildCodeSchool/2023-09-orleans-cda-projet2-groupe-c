import { useHome } from '../../contexts/HomeContext';

interface InteractionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function InteractionButton({
  children,
}: InteractionButtonProps) {
  const { handleLikeClick } = useHome();

  return (
    <button
      type='button'
      onClick={handleLikeClick}
      className='bg-light flex h-16 w-16 items-center justify-center rounded-full text-black shadow-md'
    >
      {children}
    </button>
  );
}
