import { type ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type City = {
  id: number;
  name: string;
};

export default function FormCityTest() {
  const { register, setValue, getValues } = useFormContext();
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [cities, setCities] = useState<Array<City>>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen);

  const handleCityClick = (cityName: string) => {
    setInputValue(cityName);
    setCities([]); // Clear the cities after selecting one
    setValue('city', cityName); // Update the form value
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    if (event) {
      const input = event.target.value;
      setInputValue(input);

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
      }
    }
  };

  return (
    <div className='w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'I LIVE IN...'}
      </h1>
      <div className='bg-light text-secondary font-base h-full rounded-md px-7 pb-8 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-8'>
          {'Choose your city or geolocate yourself.'}
        </span>
        <div className='text-secondary relative'>
          <input
            type='search'
            id='city'
            onChange={handleChange}
            value={inputValue}
            placeholder={
              Boolean(getValues('city'))
                ? getValues('city')
                : 'Write and choose your city'
            }
            className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
          />
          <div className='bg-light absolute max-h-80 w-full overflow-y-auto rounded-lg shadow-lg'>
            {cities.map((city) => (
              <div key={city.id}>
                <label
                  htmlFor={city.name}
                  className='hover:bg-primary hover:text-light flex w-full cursor-pointer items-center justify-center py-3 text-xl'
                  onClick={() => {
                    handleCityClick(city.name);
                  }}
                >
                  {city.name}
                </label>
                <input
                  type='radio'
                  id={city.name}
                  value={city.name}
                  className='sr-only'
                  {...register('city')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
