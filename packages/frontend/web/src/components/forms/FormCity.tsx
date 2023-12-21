import { type ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type City = {
  id: number;
  name: string;
};

export default function FormCity() {
  const { register, setValue, getValues } = useFormContext();
  const [inputValue, setInputValue] = useState<string>(
    getValues('city') === undefined ? '' : getValues('city'),
  );
  const [cities, setCities] = useState<Array<City>>([]);

  const handleCityClick = (cityName: string, cityId: number) => {
    setInputValue(cityName);
    setCities([]); // Clear the cities after selecting one
    setValue('cityId', cityId); // Update the form value
    setValue('city', cityName); //Update name value
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    if (event) {
      const input = event.target.value;
      setInputValue(input);

      // Fetch cities when input length is 3 or more
      if (input.length >= 3) {
        const abortController = new AbortController();

        (async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/cities?name=${input}&order=asc`,
              {
                signal: abortController.signal,
              },
            );

            const data = await response.json();
            setCities(data);
          } catch (error) {
            throw new Error(`${String(error)}`);
          }
        })();

        return () => {
          abortController.abort();
        };
      } else if (input.length === 0) {
        setCities([]);
      }
    }
  };

  return (
    <FormContainer title='I LIVE IN...'>
      <span className='flex justify-start pb-8'>
        {'Choose your city or geolocate yourself.'}
      </span>
      <div className='text-secondary relative'>
        <input
          type='search'
          id='city'
          onChange={handleChange}
          value={inputValue}
          placeholder='Write and choose your city'
          className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
        />
        <div className='bg-light absolute max-h-80 w-full overflow-y-auto rounded-lg shadow-lg'>
          {cities.map((city) => (
            <div key={city.id}>
              <label
                htmlFor={city.name}
                className='hover:bg-primary hover:text-light flex w-full cursor-pointer items-center justify-center py-3 text-xl'
                onClick={() => {
                  handleCityClick(city.name, city.id);
                }}
              >
                {city.name}
              </label>
              <input
                type='radio'
                id={city.name}
                value={city.name}
                className='sr-only'
                {...register('cityId', { required: true })}
              />
            </div>
          ))}
        </div>
      </div>
    </FormContainer>
  );
}
