import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'name';
export default function FormTechnology() {
  const props = {
    apiUrl: 'technologies',
    formTitle: 'MY TECHNOLOGY',
    subtitle: 'You can choose some technologies.',
    fieldName: 'technologies' as FieldName,
    storageKey: 'technologies',
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
