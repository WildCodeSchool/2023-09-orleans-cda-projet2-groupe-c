export default function PenIcon({
  className,
  onClick,
}: {
  readonly className?: string;
  readonly onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
    >
      <path d='M11.3567 3.64195L16.3575 8.64282L5.49837 19.502L1.0397 19.9942C0.442814 20.0602 -0.0614908 19.5555 0.00491652 18.9586L0.501018 14.4968L11.3567 3.64195ZM19.4505 2.89741L17.1025 0.549325C16.37 -0.183108 15.1821 -0.183108 14.4497 0.549325L12.2407 2.75835L17.2415 7.75921L19.4505 5.55019C20.183 4.81736 20.183 3.62985 19.4505 2.89741Z' />
    </svg>
  );
}
