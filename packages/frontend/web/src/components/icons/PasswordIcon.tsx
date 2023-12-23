export default function PasswordIcon({
  className,
}: {
  readonly className: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 15 18'
      className={className}
    >
      <path d='M13.3929 7.92871H12.5893V5.518C12.5893 2.71219 10.3058 0.428711 7.5 0.428711C4.6942 0.428711 2.41071 2.71219 2.41071 5.518V7.92871H1.60714C0.719866 7.92871 0 8.64858 0 9.53585V15.9644C0 16.8517 0.719866 17.5716 1.60714 17.5716H13.3929C14.2801 17.5716 15 16.8517 15 15.9644V9.53585C15 8.64858 14.2801 7.92871 13.3929 7.92871ZM9.91071 7.92871H5.08929V5.518C5.08929 4.18876 6.17076 3.10728 7.5 3.10728C8.82924 3.10728 9.91071 4.18876 9.91071 5.518V7.92871Z' />
    </svg>
  );
}
