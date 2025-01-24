const extractPublicId = (imageUrl: string) => {
  const parts = imageUrl.split("/");
  const publicIdWithExtension = parts.slice(-1)[0];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
};

export default extractPublicId;
