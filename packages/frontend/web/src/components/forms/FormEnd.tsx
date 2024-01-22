import CheckIcon from '../icons/CheckIcon';
import FormContainer from './FormContainer';

export default function FormEnd() {
  return (
    <FormContainer title='PROFILE COMPLETE !'>
      <div className='flex flex-col items-center gap-8 text-center'>
        <CheckIcon />
        <h2 className='w-64 text-xl lg:text-2xl'>
          {'Your Tindev profile is completed!'}
        </h2>
        <span className='text-sm md:text-base'>
          {
            'You can now take full advantage of the Tindev application! We wish you a pleasant experience!'
          }
        </span>
      </div>
    </FormContainer>
  );
}
