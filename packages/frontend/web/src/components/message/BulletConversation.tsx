interface BulletConversationProps {
  readonly texte: string;
  readonly date: Date;
  readonly imageUrl: string | undefined;
}
export default function BulletConversation({
  texte,
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
        <p className='text-secondary'>{texte}</p>
        <div className='text-placeholder pt-2 text-xs'>
          <p>{Boolean(date) ? date.toLocaleString() : 'Date non disponible'}</p>
        </div>
      </div>
      {/* bullet  */}
    </>
  );
}
