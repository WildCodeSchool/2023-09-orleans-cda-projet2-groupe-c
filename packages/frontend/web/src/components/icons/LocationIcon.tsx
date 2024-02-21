export default function LocationIcon({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 15 20'
    >
      <path d='M6.72921 19.5965C1.05351 11.3684 0 10.5239 0 7.5C0 3.35785 3.35785 0 7.5 0C11.6421 0 15 3.35785 15 7.5C15 10.5239 13.9465 11.3684 8.27078 19.5965C7.89831 20.1345 7.10164 20.1345 6.72921 19.5965ZM7.5 10.625C9.22589 10.625 10.625 9.2259 10.625 7.5C10.625 5.7741 9.22589 4.375 7.5 4.375C5.7741 4.375 4.375 5.7741 4.375 7.5C4.375 9.2259 5.7741 10.625 7.5 10.625Z' />
    </svg>
  );
}
