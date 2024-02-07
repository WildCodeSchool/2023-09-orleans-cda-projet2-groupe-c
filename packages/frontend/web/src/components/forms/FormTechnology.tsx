import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'technologies';

const props = {
  apiUrl: 'technologies',
  formTitle: 'MY TECHNOLOGIES',
  subtitle: 'You can choose some technologies.',
  fieldName: 'technologies' as FieldName,
};
export default function FormTechnology() {
  return <LanguageAndTechnologyContainer {...props} />;
}
