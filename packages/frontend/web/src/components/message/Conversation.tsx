export default function Conversation() {
  return (
    <div className='absolute right-0 z-50 ml-auto flex h-[calc(100vh-56px)] w-[75%] bg-red-700'>
      {/*  sidebar */}
      {/* <div className='h-full w-[25%] bg-blue-500'></div> */}
      {/*  sidebar */}
      <div className='h-full flex-grow bg-pink-700'>
        <div className='h-14 w-full bg-white' />
        <div className='flex h-[calc(100%-3.5rem)] w-full flex-col justify-end gap-5 bg-green-900 p-3'>
          <div className='h-full overflow-y-auto bg-red-600'>
            <div className={`flex flex-col-reverse gap-6 overflow-y-auto`}>
              <div className='h-12 w-1/2  bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
            </div>
          </div>
          {/*  text */}

          <form
            action=''
            className='relative flex h-12 w-full items-center bg-black'
          >
            <textarea className='flex h-full w-full resize-none items-center rounded-l-full bg-white p-3' />
            <div className='flex h-full w-20 items-center justify-center rounded-r-full bg-slate-600'>
              <p>{'yoo'}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
