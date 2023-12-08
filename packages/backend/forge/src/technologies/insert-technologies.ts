import { db } from '@app/backend-shared';

export const insertTechnologies = async () => {
  await db
    .insertInto('technology')
    .values([
      {
        name: 'angular',
        logo_path: '/images/technologies-logos/angular.svg',
      },
      {
        name: 'express',
        logo_path: '/images/technologies-logos/express.svg',
      },
      {
        name: 'nodejs',
        logo_path: '/images/technologies-logos/nodejs.svg',
      },
      {
        name: 'react',
        logo_path: '/images/technologies-logos/react.svg',
      },
      {
        name: 'vuejs',
        logo_path: '/images/technologies-logos/vuejs.svg',
      },
      {
        name: 'asp-net',
        logo_path: '/images/technologies-logos/asp-net.svg',
      },
      {
        name: 'jquery',
        logo_path: '/images/technologies-logos/jquery.svg',
      },
      {
        name: 'graphql',
        logo_path: '/images/technologies-logos/graphql.svg',
      },
      {
        name: 'docker',
        logo_path: '/images/technologies-logos/docker.svg',
      },
      {
        name: 'mysql',
        logo_path: '/images/technologies-logos/mysql.svg',
      },
      {
        name: 'postgree',
        logo_path: '/images/technologies-logos/postgree.svg',
      },
      {
        name: 'mongodb',
        logo_path: '/images/technologies-logos/mongodb.svg',
      },
      {
        name: 'git',
        logo_path: '/images/technologies-logos/git.svg',
      },
      {
        name: 'github',
        logo_path: '/images/technologies-logos/github.svg',
      },
      {
        name: 'sass',
        logo_path: '/images/technologies-logos/sass.svg',
      },
      {
        name: 'webpack',
        logo_path: '/images/technologies-logos/webpack.svg',
      },
      {
        name: 'json',
        logo_path: '/images/technologies-logos/json.svg',
      },
      {
        name: 'firebase',
        logo_path: '/images/technologies-logos/firebase.svg',
      },
      {
        name: 'bootstrap',
        logo_path: '/images/technologies-logos/bootstrap.svg',
      },
      {
        name: 'django',
        logo_path: '/images/technologies-logos/django.svg',
      },
      {
        name: 'nextjs',
        logo_path: '/images/technologies-logos/nextjs.svg',
      },
      {
        name: 'redux',
        logo_path: '/images/technologies-logos/redux.svg',
      },
      {
        name: 'tailwind',
        logo_path: '/images/technologies-logos/tailwind.svg',
      },
      {
        name: 'nginx',
        logo_path: '/images/technologies-logos/nginx.svg',
      },
      {
        name: 'heroku',
        logo_path: '/images/technologies-logos/heroku.svg',
      },
      {
        name: 'rails',
        logo_path: '/images/technologies-logos/rails.svg',
      },
      {
        name: 'vscode',
        logo_path: '/images/technologies-logos/vscode.svg',
      },
      {
        name: 'sublim-text',
        logo_path: '/images/technologies-logos/sublim-text.svg',
      },
      {
        name: 'atom',
        logo_path: '/images/technologies-logos/atom.svg',
      },
      {
        name: 'gitlab',
        logo_path: '/images/technologies-logos/gitlab.svg',
      },
      {
        name: 'bitbucket',
        logo_path: '/images/technologies-logos/bitbucket.svg',
      },
      {
        name: 'postman',
        logo_path: '/images/technologies-logos/postman.svg',
      },
      {
        name: 'figma',
        logo_path: '/images/technologies-logos/figma.svg',
      },
      {
        name: 'eslint',
        logo_path: '/images/technologies-logos/eslint.svg',
      },
      {
        name: 'jira',
        logo_path: '/images/technologies-logos/jira.svg',
      },
      {
        name: 'spring',
        logo_path: '/images/technologies-logos/spring.svg',
      },
      {
        name: 'laravel',
        logo_path: '/images/technologies-logos/laravel.svg',
      },
      {
        name: 'symfony',
        logo_path: '/images/technologies-logos/symfony.svg',
      },
      {
        name: 'flask',
        logo_path: '/images/technologies-logos/flask.svg',
      },
      {
        name: 'meteor',
        logo_path: '/images/technologies-logos/meteor.svg',
      },
      {
        name: 'ember',
        logo_path: '/images/technologies-logos/ember.svg',
      },
      {
        name: 'backbone',
        logo_path: '/images/technologies-logos/backbone.svg',
      },
    ])
    .execute();
};
