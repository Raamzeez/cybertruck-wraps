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
    if (!isValidObjectId(id)) {
      const response = await fetch(
        "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
      );
      const json: OfficialWrap[] = await response.json();
      const wrap = json.filter((wrap) => wrap.sha === id)[0];
      const modifiedWrap: Wrap = {
        _id: wrap.sha,
        createdAt: new Date(),
        image: wrap.download_url,
        filename: wrap.name,
        title: (wrap.path.split("/").pop() as string)
          .split("_")
          .join(" ")
          .split(".")
          .slice(0, -1)
          .join(""),
        sha: wrap.sha,
        author: "Tesla Motors",
        description: "Official Tesla Cybertruck Wrap From Github",
        official: true,
      };
      return <LargeCard wrap={modifiedWrap} />;
    }
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
      isAuthor: session?.user.id === (wrap.user?._id as User).toString(),
      anonymous: wrap.anonymous,
      profilePicture: populatedWrap?.user?.image,
      author: populatedWrap?.user?.name,
    };
    return <LargeCard wrap={modifiedWrap} />;
  } catch {
    return <Error />;
  }
}
