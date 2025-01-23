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
  const id = (await params).id;

  // if (id.includes("official")) {
  //   const response = await fetch(
  //     "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
  //   );
  //   const json: OfficialWrap[] = await response.json();
  //   json.filter(wrap => wrap.name === )

  if (!isValidObjectId(id)) {
    const response = await fetch(
      "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
    );
    const json: OfficialWrap[] = await response.json();
    const wrap = json.filter((wrap) => wrap.name === id);
    return <LargeCard wrap={wrap} />;
  }
  const wrap = await fetchWrapById(id);
  return <LargeCard wrap={wrap} />;
}
