import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'name';

export default function FormLanguage() {
  const props = {
    apiUrl: 'languages',
    formTitle: 'MY LANGUAGES',
    subtitle: 'You must select at least one language.',
    fieldName: 'languages' as FieldName,
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
