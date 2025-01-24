import { fetchWrapById } from "@/app/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LargeCard from "@/app/components/LargeCard";
import Wrap from "@/app/models/Wrap";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const id = (await params).id;

  if (!isValidObjectId(id)) {
    const response = await fetch(
      "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
    );
    const json: OfficialWrap[] = await response.json();
    const wrap = json.filter((wrap) => wrap.sha === id)[0];
    const modifiedWrap: Wrap = {
      image: wrap.download_url,
      title: (wrap.path.split("/").pop() as string)
        .split("_")
        .join(" ")
        .split(".")
        .slice(0, -1)
        .join(""),
      isAuthor: session?.user.id === wrap.user?._id.toString(),
      official: true,
    };
    return <LargeCard wrap={modifiedWrap} />;
  }
  const wrap = await fetchWrapById(id);
  const modifiedWrap = {
    _id: wrap._id.toString(),
    title: wrap.title,
    image: wrap.image,
    description: wrap.description,
    createdAt: wrap.createdAt,
    isAuthor: session?.user.id === wrap.user?._id.toString(),
  };
  return <LargeCard wrap={modifiedWrap} />;
}
