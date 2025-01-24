const validateFilename = (filename: string) => {
  return !/[^a-zA-Z0-9._-]/.test(filename);
};

export default validateFilename;
