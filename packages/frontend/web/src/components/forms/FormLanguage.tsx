import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'id' | 'name' | 'logo_path';

export default function FormLanguage() {
  const props = {
    apiUrl: 'languages',
    formTitle: 'MY LANGUAGES',
    subtitle: 'You must select at least one language.',
    fieldName: 'languages' as FieldName,
    storageKey: 'languages',
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
