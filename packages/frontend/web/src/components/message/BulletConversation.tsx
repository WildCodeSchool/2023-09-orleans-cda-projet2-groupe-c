interface BulletConversationProps {
  readonly text: string;
  readonly date: Date;
  readonly imageUrl: string | undefined;
}
export default function BulletConversation({
  text,
  date,
  imageUrl,
}: BulletConversationProps) {
  return (
    <>
      <img
        src={imageUrl}
        alt='Conversation'
        className='h-9 w-9 rounded-full shadow-md'
      />

      <div className='bg-light max-w-[calc(100%-48px)] break-words rounded-2xl p-3 shadow-md'>
        <p className='text-secondary'>{text}</p>
        <div className='text-placeholder pt-2 text-xs'>
          <p>{Boolean(date) ? date.toLocaleString() : 'Date non disponible'}</p>
        </div>
      </div>
    </>
  );
}
