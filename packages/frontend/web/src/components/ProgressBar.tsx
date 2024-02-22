export default function ProgressBar({
  percentage,
}: {
  readonly percentage: number;
}) {
  return (
    <div className='relative w-full'>
      <div
        className='bg-primary absolute left-0 top-0 h-2 rounded-full duration-500 ease-in-out'
        style={{ width: `${percentage}%` }}
      />
      <div className='bg-light-hard h-2 w-full rounded-full shadow-inner' />
    </div>
  );
}
