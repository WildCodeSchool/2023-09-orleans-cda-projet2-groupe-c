import BulletBase from '../BulletBase';
import PenIcon from '../icons/PenIcon';

interface CircularProgressBarProps {
  readonly percentage: number;
  readonly circleWidth: number;
  readonly children: React.ReactNode;
}

const radius = 85;
const dashArray = radius * Math.PI * 1.5; // Adjust for 3/4 circle

export default function CircularProgressBar({
  percentage,
  circleWidth,
  children,
}: CircularProgressBarProps) {
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className='relative h-[11rem] overflow-hidden'>
      <div className='absolute right-7 top-7 z-30'>
        <BulletBase size='10'>
          <button type='button'>
            <PenIcon className='fill-secondary h-5 w-5' />
          </button>
        </BulletBase>
      </div>

      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth='10px'
          r={radius}
          className='stroke-light-hard fill-none shadow-inner'
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth='10px'
          r={radius}
          className={`stroke-primary stroke-linecap-round circle-progress fill-none`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(135 ${circleWidth / 2} ${circleWidth / 2})`}
        />
      </svg>
      <div className='absolute left-1/2 top-1/2 mt-3 -translate-x-1/2 -translate-y-1/2'>
        {children}
      </div>
      <div className='text-light absolute bottom-0 left-0 z-30 flex w-full items-center justify-center'>
        <p className='bg-primary rounded-full px-3'>{`Completed at ${percentage} %`}</p>
      </div>
    </div>
  );
}
