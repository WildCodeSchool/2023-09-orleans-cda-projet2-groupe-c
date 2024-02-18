import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    isVisible && (
      <aside
        className={`border-divider bg-light-medium absolute z-40 h-full w-full lg:relative lg:max-w-[25vw] ${
          isBorderRight ?? 'lg:border-r'
        } ${isBorderLeft ?? 'lg:border-l'} 
        ${isHome ? 'visible h-[calc(100vh-56px)]' : 'lg:hidden'} 
        `}
      >
        {children}
      </aside>
    )
  );
}
