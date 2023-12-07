import { db } from '@app/backend-shared';

export const insertLanguages = async () => {
  await db
    .insertInto('language')
    .values([
      {
        name: 'css',
        logo_path: '/images/languages-logos/css.svg',
      },
      {
        name: 'html',
        logo_path: '/images/languages-logos/html.svg',
      },
      {
        name: 'java',
        logo_path: '/images/languages-logos/java.svg',
      },
      {
        name: 'javascript',
        logo_path: '/images/languages-logos/javascript.svg',
      },
      {
        name: 'php',
        logo_path: '/images/languages-logos/php.svg',
      },
      {
        name: 'python',
        logo_path: '/images/languages-logos/python.svg',
      },
      {
        name: 'sql',
        logo_path: '/images/languages-logos/sql.svg',
      },
      {
        name: 'c++',
        logo_path: '/images/languages-logos/c++.svg',
      },
      {
        name: 'c',
        logo_path: '/images/languages-logos/c.svg',
      },
      {
        name: 'ruby',
        logo_path: '/images/languages-logos/ruby.svg',
      },
      {
        name: 'csharp',
        logo_path: '/images/languages-logos/csharp.svg',
      },
      {
        name: 'swift',
        logo_path: '/images/languages-logos/swift.svg',
      },
      {
        name: 'typescript',
        logo_path: '/images/languages-logos/typescript.svg',
      },
      {
        name: 'golang',
        logo_path: '/images/languages-logos/golang.svg',
      },
      {
        name: 'kotlin',
        logo_path: '/images/languages-logos/kotlin.svg',
      },
      {
        name: 'rust',
        logo_path: '/images/languages-logos/rust.svg',
      },
    ])
    .execute();
};
