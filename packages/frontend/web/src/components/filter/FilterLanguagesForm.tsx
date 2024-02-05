import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

import type { RequestPreferencesBody } from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';
import useLanguages from '@/hooks/use-languages';

export default function FilterLanguagesForm({
  register,
  watch,
}: {
  readonly register: UseFormRegister<RequestPreferencesBody>;
  readonly watch: UseFormWatch<RequestPreferencesBody>;
}) {
  // Get user languages from languages custom hook
  const { languages, errorLanguages } = useLanguages();

  // Get user preferences from preference context
  const { preferences } = usePreference();

  // Watch the value from the input language_pref_id
  // Used to add class into the label
  const watchLanguagePref = watch('language_pref_id');

  return (
    <div className=''>
      {Boolean(errorLanguages) ? (
        <p className='text-primary'>{errorLanguages}</p>
      ) : (
        <div className='text-secondary grid grid-cols-5 gap-3 p-2 lg:grid-cols-4 xl:grid-cols-5'>
          {languages.map((language) => (
            <div
              key={Number(language.id)}
              className='flex flex-col items-center justify-center gap-1'
            >
              <label
                htmlFor={`language.${String(language.id)}`}
                className={`block h-full w-full ${
                  // Check if the language id is equal to the watch value
                  // If is true, add a outline border class
                  Number(watchLanguagePref) === Number(language.id) ||
                  // Or
                  // Check if no language is selected
                  // Then, check if language_pref_id is equal to the language.id
                  // If is true, add a outline border class, else, remove the class
                  (!Boolean(watchLanguagePref) &&
                    String(preferences?.language_pref_id) ===
                      String(language.id))
                    ? 'outline-primary rounded-md outline outline-offset-4 lg:rounded-sm lg:outline-offset-2'
                    : ''
                }`}
              >
                <img
                  src={language.logo_path}
                  alt={`Logo ${language.name}`}
                  className='h-full w-full object-cover'
                />
              </label>
              <input
                {...register('language_pref_id', {
                  required: false,
                  valueAsNumber: true,
                })}
                value={Number(language.id)}
                type='radio'
                id={`language.${String(language.id)}`}
                name='language_pref_id'
                checked={
                  Boolean(watchLanguagePref)
                    ? Number(watchLanguagePref) === Number(language.id)
                    : Number(preferences?.language_pref_id) ===
                      Number(language.id)
                }
                // hidden
              />
              <p className='mt-1 text-center text-xs'>
                {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
