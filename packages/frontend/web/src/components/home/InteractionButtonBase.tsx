interface InteractionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly size: string;
  readonly onClick: () => void;
}

export default function InteractionButton({
  children,
  size,
  onClick,
}: InteractionButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`bg-light flex h-${size} w-${size} items-center justify-center rounded-full text-black shadow-md`}
    >
      {children}
    </button>
  );
}
