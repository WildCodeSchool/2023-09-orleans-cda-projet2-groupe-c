import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { formCityShema } from '@app/shared';
import type { CityBody, FormCityValidation, Point } from '@app/shared';

import FormContainer from './FormContainer';

interface Coordinates {
  coordinates: Point;
}

export default function FormCity() {
  const { register, setValue, getValues, formState } =
    useFormContext<FormCityValidation>();
  const { onChange, ...rest } = register('cityName'); //use cityName to keep the name in the input
  const [cities, setCities] = useState<CityBody[]>([]);
  const { errors } = formState;
  register('cityId', {
    validate: () => {
      const result = formCityShema.safeParse({
        cityId: getValues('cityId'),
        cityName: getValues('cityName'),
      });
      return result.success ? true : result.error.errors[0]?.message;
    },
  });
  const searchBar = getValues('cityName');

  const handleCityChange = (cityName: string, cityId: number) => {
    setCities([]); // Clear the cities after selecting one
    setValue('cityId', cityId); // Update the form value
    setValue('cityName', cityName); //Update name value
  };

  const handleChange = () => {
    if (Boolean(searchBar) && searchBar.length >= 3) {
      const controller = new AbortController();

      (async () => {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/cities?name=${searchBar}&order=asc`,
            {
              signal: controller.signal,
            },
          );
          const data = await response.json();
          const citiesWithoutCoordinates = data.map(
            ({
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              coordinates,
              ...rest
            }: Coordinates) => rest,
          );
          setCities(citiesWithoutCoordinates);
        } catch (error) {
          throw new Error(`${String(error)}`);
        }
      })();

      return () => {
        controller.abort();
      };
    } else {
      setCities([]);
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
          id='searchBar'
          onChange={(event) => {
            handleChange();
            void onChange(event);
          }}
          {...rest}
          placeholder='Write and choose your city'
          className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
        />
        <div className='bg-light absolute max-h-80 w-full overflow-y-auto rounded-lg shadow-lg'>
          {cities.map((city) => (
            <div key={city.id}>
              <label
                htmlFor={city.name}
                className='hover:bg-primary hover:text-light flex w-full cursor-pointer items-center justify-center py-3 text-xl'
              >
                {city.name}
              </label>
              <input
                type='radio'
                id={city.name}
                value={city.id}
                className='absolute opacity-0'
                onChange={(event) => {
                  handleCityChange(city.name, Number(event.target.value));
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {errors.cityId ? (
        <p className='text-secondary absolute bottom-3'>
          {errors.cityId.message}
        </p>
      ) : undefined}
    </FormContainer>
  );
}