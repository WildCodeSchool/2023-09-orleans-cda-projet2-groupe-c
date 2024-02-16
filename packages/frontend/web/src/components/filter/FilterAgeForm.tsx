import type { UseFormRegister } from 'react-hook-form';
import ReactSlider from 'react-slider';

import type { RequestPreferencesBody } from '@app/shared';

export function FilterAgeForm({
  register,
}: {
  readonly register: UseFormRegister<RequestPreferencesBody>;
}) {
  return (
    <div className='flex w-full flex-col justify-between gap-2'>
      <ReactSlider
        className='py-12'
        thumbClassName='h-4 w-4 rounded-full bg-primary text-transparent cursor-pointer -translate-y-1'
        thumbActiveClassName='bg-blue-500'
        trackClassName={`border border-divider h-2 rounded-full example-track `}
        // trackClassName='example-track w-full h-2'
        min={18}
        max={100}
        step={1}
        defaultValue={[18, 100]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={10}
      />
    </div>
  );
}
