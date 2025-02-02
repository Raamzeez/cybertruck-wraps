const shaToObjectId = (sha: string): string => {
  const hex = (sha + "0".repeat(24)).slice(0, 24);
  return hex;
};

export default shaToObjectId;
