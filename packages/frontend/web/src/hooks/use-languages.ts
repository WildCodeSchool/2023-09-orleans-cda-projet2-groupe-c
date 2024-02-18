import { useEffect, useState } from 'react';

import type { LanguageTable } from '@app/shared';

export default function useLanguages() {
  const [languages, setLanguages] = useState<LanguageTable[]>([]);
  const [errorLanguages, setErrorLanguages] = useState<string>();

  // Fetch all languages
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      (async () => {
        const res = await fetch(`api/languages`, { signal });

        const data = await res.json();

        setLanguages(data);
      })();
    } catch {
      setErrorLanguages('Error fetching languages');
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { languages, errorLanguages };
}
