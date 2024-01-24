export default function GenderIcon({
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
      <path d='M11.0286 1.90476H7.61905V0H14.2857V6.66667H12.381V3.24762L8.73333 6.89524C9.22857 7.64762 9.52381 8.57143 9.52381 9.52381C9.52381 11.8286 7.88571 13.7524 5.71429 14.1905V16.1905H7.61905V18.0952H5.71429V20H3.80952V18.0952H1.90476V16.1905H3.80952V14.1905C1.6381 13.7524 0 11.8286 0 9.52381C0 8.26087 0.501699 7.04966 1.39473 6.15663C2.28776 5.2636 3.49897 4.7619 4.7619 4.7619C5.71429 4.7619 6.62857 5.04762 7.38095 5.55238L11.0286 1.90476ZM4.7619 6.66667C4.00414 6.66667 3.27742 6.96769 2.7416 7.5035C2.20578 8.03932 1.90476 8.76605 1.90476 9.52381C1.90476 10.2816 2.20578 11.0083 2.7416 11.5441C3.27742 12.0799 4.00414 12.381 4.7619 12.381C5.51967 12.381 6.24639 12.0799 6.78221 11.5441C7.31803 11.0083 7.61905 10.2816 7.61905 9.52381C7.61905 8.76605 7.31803 8.03932 6.78221 7.5035C6.24639 6.96769 5.51967 6.66667 4.7619 6.66667Z' />
    </svg>
  );
}
