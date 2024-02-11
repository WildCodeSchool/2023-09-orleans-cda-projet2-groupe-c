import CheckIcon from '../icons/CheckIcon';
import FormContainer from './FormContainer';

export default function FormEnd() {
  return (
    <FormContainer title='PROFILE COMPLETE !'>
      <div className='mt-4 flex flex-col items-center text-center'>
        <CheckIcon />
        <h2 className='mt-4 w-64 text-xl lg:text-2xl'>
          {'Your Tindev profile is completed!'}
        </h2>
        <p className='mt-10 text-sm md:text-base'>
          {
            'You can now take full advantage of the Tindev application! We wish you a pleasant experience!'
          }
        </p>
      </div>
    </FormContainer>
  );
}
