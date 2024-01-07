interface BadgeProps {
  readonly children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <div className='bg-light-medium flex items-center justify-center gap-1 rounded-full px-3'>
      {children}
    </div>
  );
}
