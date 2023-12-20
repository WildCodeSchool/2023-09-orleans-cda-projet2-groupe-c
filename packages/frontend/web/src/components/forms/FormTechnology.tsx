import { useEffect } from 'react';

import LanguageAndTechnologyContainer from './LanguageAndTechnologyContainer';

type FieldName = 'id' | 'name' | 'logo_path';
export default function FormTechnology() {
  useEffect(() => {
    // Désactiver le défilement lorsque le composant est monté
    document.body.style.overflow = 'hidden';

    // Réactiver le défilement lorsque le composant est démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const props = {
    apiUrl: 'technologies',
    formTitle: 'MY TECHNOLOGY',
    subtitle: 'You can choose some technologies.',
    fieldName: 'technologies' as FieldName,
    storageKey: 'technologies',
  };
  return <LanguageAndTechnologyContainer {...props} />;
}
