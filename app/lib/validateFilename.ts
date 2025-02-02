const validateFilename = (filename: string) => {
  if (!filename.endsWith(".png")) {
    return false;
  }

  const nameWithoutExtension = filename.slice(0, -4);
  return /^[a-zA-Z0-9]+$/.test(nameWithoutExtension);
};

export default validateFilename;
