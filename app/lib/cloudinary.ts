import { v2 as cloudinary } from "cloudinary";

export function getCloudinaryConfig() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary configuration is missing");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return cloudinary;
}
