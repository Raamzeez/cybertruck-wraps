const validateFilename = (filename: string) => {
  return !/[^a-zA-Z0-9]/.test(filename);
};

export default validateFilename;
