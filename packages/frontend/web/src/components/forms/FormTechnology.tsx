import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

export default function FormTechnology() {
  const props = {
    apiUrl: 'technologies',
    formTitle: 'MY TECHNOLOGY',
    subtitle: 'You can choose some technologies.',
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
