import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

interface DefaultValues {
  id: number;
  name: string;
  logo_path: string;
}

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly apiUrl: string;
  readonly formTitle: string;
  readonly subtitle: string;
}

export default function LanguageAndTechnology({
  apiUrl,
  formTitle,
  subtitle,
}: SelectionFormProps) {
  const { register } = useFormContext<DefaultValues>();
  const [items, setItems] = useState<Array<DefaultValues>>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;

    if (selectedItems.includes(language)) {
      setSelectedItems(selectedItems.filter((lang) => lang !== language));
      console.log('je retire');
    } else if (selectedItems.length < 6) {
      console.log('jajoute');

      setSelectedItems([...selectedItems, language]);
    }
  };

  console.log(selectedItems);

  console.log(items);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          signal: abortController.signal,
        },
      );
      const data = await response.json();
      setItems(data);
    })();

    return () => {
      abortController.abort();
    };
  }, [apiUrl]);

  let firstSelectedItems;

  if (apiUrl === 'languages') {
    firstSelectedItems = items.find(
      (language) => language.name === selectedItems[0],
    );
  } else {
    console.log('cheh');
  }

  return (
    <FormContainer title={formTitle}>
      <span className='flex justify-start'>
        {/* {'You must select at least one language.'} */}
        {subtitle}
      </span>
      <div className='mt-3 flex flex-col justify-center text-center'>
        {apiUrl === 'languages' ? (
          <div className='flex flex-col items-center justify-center gap-3'>
            <div className='outline-primary my-2 flex h-12 w-12 items-center justify-center rounded-md py-2 outline outline-offset-2 md:mt-4 md:h-16 md:w-16'>
              <img
                src={firstSelectedItems?.logo_path}
                alt={firstSelectedItems?.name}
              />
            </div>
            <span>{'This language will be displayed on your profile'}</span>
          </div>
        ) : (
          ''
        )}
        <div className='flex justify-center'>
          <div className='my-5 grid max-h-48 max-w-[26rem] grid-cols-4 gap-x-4 gap-y-2 overflow-y-auto px-5 py-3 md:max-h-56 md:px-10'>
            {items.map((item) => (
              <div
                className='flex flex-col items-center text-center duration-200 hover:scale-105'
                key={item.id}
              >
                <label className='text-[12px]' htmlFor={item.name}>
                  <div className='relative flex justify-center'>
                    {selectedItems.includes(item.name) ? (
                      <div className='bg-primary absolute right-0 top-0 flex h-5 w-5 translate-x-2 translate-y-[-8px] items-center justify-center rounded-full'>
                        <p className='text-white'>
                          {selectedItems.indexOf(item.name) + 1}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}

                    <img
                      className={`hover:outline-primary h-12 w-12 hover:rounded-md hover:outline hover:outline-offset-2 lg:h-16 lg:w-16 ${
                        selectedItems.includes(item.name)
                          ? 'outline-primary rounded-md outline outline-offset-2'
                          : ''
                      }`}
                      src={item.logo_path}
                    />
                  </div>

                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </label>
                <input
                  value={item.name}
                  id={item.name}
                  type='checkbox'
                  {...register('name', { required: true })}
                  onChange={handleCheckboxChange}
                  disabled={
                    selectedItems.length >= 6 &&
                    !selectedItems.includes(item.name)
                  }
                  className='sr-only'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='h-7'>
        {selectedItems.length >= 6 && (
          <p className=' text-next text-base'>{'stop tu en a 6 !'}</p>
        )}
      </div>
    </FormContainer>
  );
}
