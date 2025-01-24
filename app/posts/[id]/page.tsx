import { fetchWrapById } from "@/app/actions";
import LargeCard from "@/app/components/LargeCard";
import Wrap from "@/app/models/Wrap";
import { isValidObjectId } from "mongoose";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      official: true,
    };
    console.log(wrap);
    return <LargeCard wrap={modifiedWrap} />;
  }
  const wrap = await fetchWrapById(id);
  const modifiedWrap = {
    _id: wrap._id.toString(),
    title: wrap.title,
    image: wrap.image,
    description: wrap.description,
  };
  return <LargeCard wrap={modifiedWrap} />;
}
