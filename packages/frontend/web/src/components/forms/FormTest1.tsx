import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

export default function FormTest1() {
  const props = {
    apiUrl: 'languages',
    formTitle: 'MY LANGUAGES',
    subtitle: 'You must select at least one language.',
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
