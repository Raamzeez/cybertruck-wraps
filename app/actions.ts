"use server";

import { connectToDatabase } from "@/lib/mongodb";
import WrapMongoose from "./models/WrapMongoose";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";

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
    const deletedWrap = await WrapMongoose.findByIdAndDelete(id);

    if (!deletedWrap) {
      throw new Error("Wrap was not found. Please refresh app");
    }
    revalidatePath("/wraps");
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed to delete wrap. Please try again later");
  }
};

export const createWrap = async (
  title: string,
  image: string,
  description: string,
  anonymous: boolean
) => {
  "use server";

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

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
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    await WrapMongoose.create({
      title,
      image: uploadResponse.secure_url,
      description,
      anonymous,
      user: session.user.id,
    });
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed to upload post");
  }
};
