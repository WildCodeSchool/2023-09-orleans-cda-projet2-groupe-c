/* function onSubmit() {
  //
} */
export default function RegisterProfile() {
  return (
    <div className='mt-32 flex items-center justify-center'>
      <form
        /*   onSubmit={{ onSubmit }} */
        action='post'
        className='bg-light-light text-light-hard flex w-56 flex-col gap-2'
      >
        <input className='bg-dark-ulta-light flex flex-col' type='text' />
        <input className='bg-dark-ulta-light flex flex-col' type='email' />
        <input className='bg-dark-ulta-light flex flex-col' type='password' />
        <button className='bg-primary rounded-md' type='submit'>
          {'Register'}
        </button>
      </form>
    </div>
  );
}
