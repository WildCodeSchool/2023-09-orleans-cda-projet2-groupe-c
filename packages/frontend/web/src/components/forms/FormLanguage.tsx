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

  return (
    <FormContainer title='MY LANGUAGES'>
      <span className='flex justify-start'>
        {'The maximum allowed number of character is 100.'}
      </span>
      <div className='flex justify-center'>
        <div className='mt-5 flex max-h-80 flex-wrap justify-start gap-3 overflow-y-auto px-5 py-5 md:px-10'>
          {languages.map((language) => (
            <div
              className='flex flex-col items-center text-center duration-200 hover:scale-105'
              key={language.id}
            >
              <label className='text-[12px]' htmlFor={language.name}>
                <div className='relative'>
                  {selectedLanguages.includes(language.name) ? (
                    <div className='bg-primary absolute right-0 top-0 z-50 flex h-5 w-5 translate-x-2 translate-y-[-8px] items-center justify-center rounded-full'>
                      <p className=''>
                        {selectedLanguages.indexOf(language.name) + 1}
                      </p>
                    </div>
                  ) : (
                    ''
                  )}

                  <img
                    className={`hover:outline-primary h-16 w-16 hover:rounded-lg hover:outline hover:outline-offset-2 lg:h-20 lg:w-20 ${
                      selectedLanguages.includes(language.name)
                        ? 'outline-primary rounded-lg outline outline-offset-2'
                        : ''
                    }`}
                    src={language.logo_path}
                  />
                </div>

                {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
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
      {selectedLanguages.length >= 6 && (
        <p className=' text-next mt-2 text-lg'>{'stop tu en a 6 !'}</p>
      )}
    </FormContainer>
  );
}
