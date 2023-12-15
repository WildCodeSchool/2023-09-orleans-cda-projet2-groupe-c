export default function FilterIcon({
  className,
}: {
  readonly className: string;
}) {
  return (
    <svg
      className={className}
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 4.625H11.7857V2.875H0V4.625ZM13.9286 0C13.3368 0 12.8571 0.559644 12.8571 1.25V6.25C12.8571 6.94036 13.3368 7.5 13.9286 7.5C14.5203 7.5 15 6.94036 15 6.25V1.25C15 0.559644 14.5203 0 13.9286 0ZM7.5 10.375V8.75C7.5 8.05964 7.0203 7.5 6.42857 7.5C5.83684 7.5 5.35714 8.05964 5.35714 8.75V13.75C5.35714 14.4404 5.83684 15 6.42857 15C7.0203 15 7.5 14.4404 7.5 13.75V12.125H15V10.375H7.5ZM0 12.125H4.28571V10.375H0V12.125Z'
        fill='currentColor'
      />
    </svg>
  );
}
