interface BulletBaseProps {
  readonly children: React.ReactNode;
  readonly lgHidden?: boolean;
  readonly size: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

export default function BulletBase({
  children,
  lgHidden,
  size,
  onClick,
  disabled,
}: BulletBaseProps) {
  return (
    <div
      onClick={disabled ?? false ? undefined : onClick}
      className={`${lgHidden ?? false ? 'lg:hidden' : ''} ${
        disabled ?? false ? 'opacity-50' : ''
      } bg-light active:shadow-divider-dark flex h-${size} w-${size} cursor-pointer items-center justify-center rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner`}
    >
      {children}
    </div>
  );
}
