import Message from '../message/Message';

export default function HomeCards() {
  return (
    <main className='relative'>
      <Message />
      <div className='font-base relative mx-auto flex h-[calc(100vh-65px)] w-full max-w-[500px] flex-col justify-between gap-5 overflow-y-auto px-5 py-10 text-white'>
        <h1>{`HomeCards`}</h1>
      </div>
    </main>
  );
}
