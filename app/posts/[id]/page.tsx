import { fetchWrapById } from "@/app/actions";
import Error from "@/app/components/Error";
import LargeCard from "@/app/components/LargeCard";
import { authOptions } from "@/app/lib/auth";
import OfficialWrap from "@/app/models/OfficialWrap";
import { User } from "@/app/models/User";
import Wrap from "@/app/models/Wrap";
import WrapMongoose from "@/app/models/WrapMongoose";
import { isValidObjectId, ObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const id = (await params).id;

  try {
    const wrap = await fetchWrapById(id);
    const populatedWrap = await WrapMongoose.findById(wrap._id)
      .populate("user", "image name")
      .lean();
    const modifiedWrap = {
      _id: wrap._id!.toString(),
      title: wrap.title,
      image: wrap.image,
      filename: wrap.filename,
      description: wrap.description,
      createdAt: wrap.createdAt,
      official: wrap.official,
      isAuthor: !wrap.official
        ? // @ts-ignore
          session?.user.id === (wrap.user?._id as User).toString()
        : false,
      anonymous: wrap.anonymous,
      // @ts-ignore
      profilePicture: populatedWrap?.user?.image,
      // @ts-ignore
      author: wrap.official ? "Tesla Motors" : populatedWrap?.user?.name,
    };
    return <LargeCard wrap={modifiedWrap} />;
  } catch (error) {
    console.error(error);
    return <Error />;
  }
}
