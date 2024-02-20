export default function SidebarLayout({
  children,
  isVisible,
  isBorderRight,
  isBorderLeft,
}: {
  readonly children: React.ReactNode;
  readonly isVisible: boolean;
  readonly isBorderRight?: boolean;
  readonly isBorderLeft?: boolean;
}) {
  const isAbsolute = window.innerWidth < 1024;

  return (
    isVisible && (
      <aside
        className={`${
          isAbsolute ? 'absolute z-40' : 'block'
        } border-divider bg-light-medium h-full w-full lg:max-w-[25vw] ${
          isBorderRight ?? 'lg:border-r'
        } ${isBorderLeft ?? 'lg:border-l'}`}
      >
        {children}
      </aside>
    )
  );
}
