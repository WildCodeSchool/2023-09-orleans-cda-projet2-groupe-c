import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type DefaultValues = {
  id: number;
  name: string;
  logo_path: string;
};

export default function FormLanguage() {
  const { register } = useFormContext<DefaultValues>();
  const [languages, setLanguages] = useState<Array<DefaultValues>>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;

    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language),
      );
      console.log('je retire');
    } else if (selectedLanguages.length < 6) {
      console.log('jajoute');

      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  console.log(selectedLanguages);

  console.log(languages);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/languages`,
        {
          signal: abortController.signal,
        },
      );
      const data = await response.json();
      setLanguages(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const firstSelectedLanguage = languages.find(
    (language) => language.name === selectedLanguages[0],
  );

  return (
    <FormContainer title='MY LANGUAGES'>
      <span className='flex justify-start'>
        {'You must select at least one language.'}
      </span>
      <div className='mt-3 flex flex-col justify-center text-center'>
        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='outline-primary my-2 flex h-12 w-12 items-center justify-center rounded-md py-2 outline outline-offset-2 md:mt-4 md:h-16 md:w-16'>
            <img
              src={firstSelectedLanguage?.logo_path}
              alt={firstSelectedLanguage?.name}
            />
          </div>
          <span>{'This language will be displayed on your profile'}</span>
        </div>
        <div className='flex justify-center'>
          <div className='my-5 grid max-h-48 max-w-[26rem] grid-cols-4 flex-wrap items-center justify-between gap-x-4 gap-y-2 overflow-y-auto px-5 py-3 md:max-h-56 md:px-10'>
            {languages.map((language) => (
              <div
                className='flex flex-col items-center text-center duration-200 hover:scale-105'
                key={language.id}
              >
                <label className='text-[12px]' htmlFor={language.name}>
                  <div className='relative flex justify-center'>
                    {selectedLanguages.includes(language.name) ? (
                      <div className='bg-primary absolute right-0 top-0 flex h-5 w-5 translate-x-2 translate-y-[-8px] items-center justify-center rounded-full'>
                        <p className='text-white'>
                          {selectedLanguages.indexOf(language.name) + 1}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}

                    <img
                      className={`hover:outline-primary h-12 w-12 hover:rounded-md hover:outline hover:outline-offset-2 lg:h-16 lg:w-16 ${
                        selectedLanguages.includes(language.name)
                          ? 'outline-primary rounded-md outline outline-offset-2'
                          : ''
                      }`}
                      src={language.logo_path}
                    />
                  </div>

                  {language.name.charAt(0).toUpperCase() +
                    language.name.slice(1)}
                </label>
                <input
                  value={language.name}
                  id={language.name}
                  type='checkbox'
                  {...register('name', { required: true })}
                  onChange={handleCheckboxChange}
                  disabled={
                    selectedLanguages.length >= 6 &&
                    !selectedLanguages.includes(language.name)
                  }
                  className='sr-only'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='h-7'>
        {selectedLanguages.length >= 6 && (
          <p className=' text-next text-base'>{'stop tu en a 6 !'}</p>
        )}
      </div>
    </FormContainer>
  );
}
