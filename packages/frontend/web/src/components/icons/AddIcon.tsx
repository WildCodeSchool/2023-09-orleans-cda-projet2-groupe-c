export default function AddIcon({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <svg
      viewBox='0 0 35 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M17.6792 1.76904L17.6377 33.4522'
        stroke='#EB0573'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.76904 17.6106H33.4522'
        stroke='#EB0573'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
