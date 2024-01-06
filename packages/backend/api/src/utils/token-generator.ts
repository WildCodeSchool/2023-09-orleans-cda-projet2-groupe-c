import * as randomString from 'randomstring';

export const tokenGenerator = (): string => {
  return randomString
    .generate({
      length: 6,
      charset: 'alphanumeric',
    })
    .toUpperCase();
};
