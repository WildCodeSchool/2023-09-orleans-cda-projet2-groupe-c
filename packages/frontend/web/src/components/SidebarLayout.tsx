export default function SidebarLayout({
  children,
  isVisible,
  isBorderRight,
  isBorderLeft,
  className,
}: {
  readonly children: React.ReactNode;
  readonly isVisible: boolean;
  readonly isBorderRight?: boolean;
  readonly isBorderLeft?: boolean;
  readonly className?: string;
}) {
  return (
    isVisible && (
      <aside
        className={`border-divider bg-light-medium absolute z-40 h-full w-full lg:relative lg:max-w-[25vw] ${
          isBorderRight ?? 'lg:border-r'
        } ${isBorderLeft ?? 'lg:border-l'} 
       ${className}
        `}
      >
        {children}
      </aside>
    )
  );
}
