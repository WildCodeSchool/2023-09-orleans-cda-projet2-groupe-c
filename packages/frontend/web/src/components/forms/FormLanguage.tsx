import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'languages';

const props = {
  apiUrl: 'languages',
  formTitle: 'I master...',
  subtitle: 'You must select at least one language.',
  fieldName: 'languages' as FieldName,
};
export default function FormLanguage() {
  return <LanguageAndTechnologyContainer {...props} />;
}
