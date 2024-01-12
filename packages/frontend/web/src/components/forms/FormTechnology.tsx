import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'technologies';

export default function FormTechnology() {
  const props = {
    apiUrl: 'technologies',
    formTitle: 'MY TECHNOLOGY',
    subtitle: 'You can choose some technologies.',
    fieldName: 'technologies' as FieldName,
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
