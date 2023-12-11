import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type City = {
  id: number;
  name: string;
};

export default function FormCity() {
  const { register } = useFormContext();
  const [cities, setCities] = useState<Array<City>>([]);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cities`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setCities(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'I LIVE IN...'}
      </h1>
      <div className='bg-light text-secondary font-base h-full rounded-md px-7 pb-8 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-8'>
          {'Choose your city or geolocate yourself.'}
        </span>
        <select
          className='border-primary w-full rounded-lg border py-2 text-center text-xl focus:outline-none'
          {...register('city_id')}
        >
          {cities.map((city) => (
            <option className='' key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
