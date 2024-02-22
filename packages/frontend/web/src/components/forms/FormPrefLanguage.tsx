import { useFormContext } from 'react-hook-form';

import { type FormLanguagePref, formLanguagePrefSchema } from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';
import useLanguages from '@/hooks/use-languages';

import FormContainer from './FormContainer';

export default function FormPrefLanguage() {
  // Get user languages from languages custom hook
  const { register, watch, formState } = useFormContext<FormLanguagePref>();
  const { languages, errorLanguages } = useLanguages();
  const { errors } = formState;

  // Get user preferences from preference context
  const { preferences } = usePreference();

  const watchLanguagePref = watch('languagePrefId');

  return (
    <FormContainer title="I'm look for people who master...">
      <span className='flex justify-start pb-5'>
        {'Choose your favorite language.'}
      </span>
      {Boolean(errorLanguages) ? (
        <p className='text-primary'>{errorLanguages}</p>
      ) : (
        <div className='mt-5 grid max-h-[30vh] max-w-[26rem] grid-cols-4 gap-x-4 gap-y-4 overflow-y-auto px-5 py-3 md:px-10'>
          {languages.map((language) => (
            <div
              key={Number(language.id)}
              className='flex flex-col items-center justify-center '
            >
              <label
                htmlFor={`language.${String(language.id)}`}
                className={`block h-full w-full ${
                  Number(watchLanguagePref) === Number(language.id) ||
                  (!Boolean(watchLanguagePref) &&
                    String(preferences?.language_pref_id) ===
                      String(language.id))
                    ? 'outline-primary rounded-md outline outline-offset-4 lg:outline-offset-2'
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
                {...register('languagePrefId', {
                  valueAsNumber: true,
                  validate: (value) => {
                    const result =
                      formLanguagePrefSchema.shape.languagePrefId.safeParse(
                        value,
                      );
                    if (!result.success) {
                      return 'ⓘ This field is required.';
                    }
                    return true;
                  },
                })}
                value={Number(language.id)}
                type='radio'
                id={`language.${String(language.id)}`}
                name='languagePrefId'
                checked={
                  Boolean(watchLanguagePref)
                    ? Number(watchLanguagePref) === Number(language.id)
                    : Number(preferences?.language_pref_id) ===
                      Number(language.id)
                }
                hidden
              />
              <p className='mt-1 text-center text-xs'>
                {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
      {errors.languagePrefId ? (
        <p className='text-primary mt-2'>{errors.languagePrefId.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
