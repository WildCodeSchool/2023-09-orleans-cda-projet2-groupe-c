import { useEffect, useState } from 'react';

import type { LanguageTable } from '@app/shared';

const API_URL = import.meta.env.VITE_API_URL;

export default function useLanguages() {
  const [languages, setLanguages] = useState<LanguageTable[]>([]);
  const [errorLanguages, setErrorLanguages] = useState<string>();

  // Fetch all languages
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLanguages = async () => {
      const res = await fetch(`${API_URL}/languages`, { signal });

      const data = await res.json();

      setLanguages(data);
    };

    fetchLanguages().catch(() => {
      setErrorLanguages('Fail to fetch languages');

      return () => {
        controller.abort();
      };
    });
  }, []);

  return { languages, errorLanguages };
}
