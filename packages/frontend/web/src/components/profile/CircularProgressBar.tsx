interface CircularProgressBarProps {
  readonly percentage: number;
  readonly circleWidth: number;
}

export default function CircularProgressBar({
  percentage,
  circleWidth,
}: CircularProgressBarProps) {
  const radius = 85;
  const dashArray = radius * Math.PI * 1.5; // Adjust for 3/4 circle
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className='relative bg-red-200'>
      <svg
        width={circleWidth}
        height={circleWidth} // Full height for 3/4 circle
        viewBox={`0 0 ${circleWidth} ${circleWidth}`} // Full viewbox for 3/4 circle
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth='10px'
          r={radius}
          className='fill-none stroke-[#ddd]'
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
          transform={`rotate(135 ${circleWidth / 2} ${circleWidth / 2})`} // Rotate by -90 degrees for 3/4 circle
        />
      </svg>
      <div className='text-light absolute bottom-0 left-0 mb-5 flex w-full items-center justify-center'>
        <p className='bg-primary rounded-full px-3'>{`Completed at ${percentage} %`}</p>
      </div>
    </div>
  );
}
