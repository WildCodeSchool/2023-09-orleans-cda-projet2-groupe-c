export const errorHandler = (message: string | undefined) => {
  const error = new Error(message);
  return error;
};
