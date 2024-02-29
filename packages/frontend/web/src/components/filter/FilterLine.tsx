export default function FilterLine({
  children,
  title,
}: {
  readonly children: React.ReactNode;
  readonly title: string;
}) {
  return (
    <section className='border-lg bg-light flex flex-col gap-4 rounded-lg p-3 shadow-md'>
      <h3 className='font-base text-secondary'>{title}</h3>

      <div className='grow'>{children}</div>
    </section>
  );
}
