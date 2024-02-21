import CardIcon from '../icons/CardIcon';

export default function ShowCard({
  onClick,
}: {
  readonly onClick: () => void;
}) {
  return (
    <button onClick={onClick} type='button' className='flex flex-col gap-1'>
      <CardIcon className='fill-secondary w-10' />
      <p className='font-base bg-secondary text-light rounded-md px-1 py-[2px] text-xs'>{`Show`}</p>
    </button>
  );
}
