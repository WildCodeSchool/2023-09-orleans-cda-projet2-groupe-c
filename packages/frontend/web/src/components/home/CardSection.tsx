interface CardSectionProps {
  readonly children: React.ReactNode;
  readonly title: string;
  readonly isBorder: boolean;
}

export default function CardSection({
  children,
  title,
  isBorder,
}: CardSectionProps) {
  return (
    <div
      className={`text-secondary mx-3 py-5 ${
        isBorder ? 'border-divider border-b ' : ''
      }`}
    >
      <h2 className='text-primary mb-3'>{title}</h2>
      {children}
    </div>
  );
}
