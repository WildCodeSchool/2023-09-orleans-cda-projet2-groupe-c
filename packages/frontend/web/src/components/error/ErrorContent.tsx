import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import StopIcon from '../icons/StopIcon';

export default function ErrorContent({
  title,
  subtitle,
  description,
}: {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}) {
  const navigate = useNavigate();

  return (
    <div className='flex h-full w-full flex-col items-center justify-around gap-4 py-12'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='font-title text-primary text-center text-4xl'>
          {title}
          <span className='mb-5 block text-center text-3xl'>{subtitle}</span>
        </h2>
        <StopIcon />
        <p className='font-base text-secondary mt-5 text-center'>
          {description}
        </p>
      </div>

      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <Button
          type={'button'}
          onClick={() => {
            navigate('/');
          }}
          isOutline={false}
        >
          {`Return to home page`}
        </Button>
        <Button
          type={'button'}
          onClick={() => {
            navigate(-1);
          }}
          isOutline
        >
          {`Return to the previous page`}
        </Button>
      </div>
    </div>
  );
}
