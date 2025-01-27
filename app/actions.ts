"use server";

import { connectToDatabase } from "@/lib/mongodb";
import WrapMongoose from "./models/WrapMongoose";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import cloudinary from "./lib/cloudinary";
import sharp from "sharp";
import validateFilename from "./lib/validateFilename";
import extractPublicId from "./lib/extractPublicId";
import { authOptions } from "./lib/auth";

export const updateWraps = async () => {
  "use server";

  return revalidatePath("/");
};

export const fetchWrapById = async (id: string) => {
  "use server";

  await connectToDatabase();

  const wrap = await WrapMongoose.findById(id);

  if (!wrap) {
    throw new Error("Wrap not found");
  }

  return wrap;
};

export const deleteWrap = async (id: string) => {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Login to delete this wrap");
  }

  await connectToDatabase();

  try {
    const foundWrap = await WrapMongoose.findById(id);
    if (!foundWrap) {
      throw new Error("Wrap not found. Please refresh app");
    }

    if (foundWrap.user.toString() !== session.user.id) {
      throw new Error("You can only delete your own wraps");
    }

    await WrapMongoose.findByIdAndDelete(id);

    const publicId = extractPublicId(foundWrap.image);

    await cloudinary.uploader.destroy(publicId);

    revalidatePath("/wraps");
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed to delete wrap. Please try again later");
  }
};

export const createWrap = async (
  title: string,
  image: string,
  filename: string,
  description: string,
  anonymous: boolean
) => {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Please login to create a wrap");
  }

  if (!title) {
    throw new Error("Title required");
  }

  if (!image) {
    throw new Error("Image required");
  }

  await connectToDatabase();

  try {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Buffer.from(base64Data, "base64");

    if (!validateFilename(filename)) {
      throw new Error(
        `File name "${filename}" contains invalid characters. Only alphanumeric characters, dots, underscores, and hyphens are allowed.`
      );
    }

    const MAX_SIZE = 1024 * 1024;
    if (binaryData.length > MAX_SIZE) {
      throw new Error("File is too large. Max size is 1 MB.");
    }

    const fileType = image.match(/^data:(image\/\w+);base64,/);
    if (!fileType || fileType[1] !== "image/png") {
      throw new Error("Invalid file type. Only PNG images are allowed.");
    }

    const metadata = await sharp(binaryData).metadata();
    if (metadata.width !== 1024 || metadata.height !== 768) {
      throw new Error(
        `Image resolution must be 1024x768 pixels. Your image is ${metadata.width}x${metadata.height} pixels.`
      );
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    await WrapMongoose.create({
      title,
      image: uploadResponse.secure_url,
      filename,
      description,
      anonymous,
      user: session.user.id,
    });
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed to upload post");
  }
};
