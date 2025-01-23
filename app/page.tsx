import client from "./lib/db";
import Wrap from "./models/Wrap";
import WrapsList from "./components/WrapsList";
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import WrapMongoose from "./models/WrapMongoose";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  await connectToDatabase();

  const response = await fetch(
    "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
  );
  const json: OfficialWrap[] = await response.json();
  const officialwraps: Wrap[] = json.map((wrap) => ({
    title: (wrap.path.split("/").pop() as string)
      .split("_")
      .join(" ")
      .split(".")
      .slice(0, -1)
      .join(""),
    image: wrap.download_url,
    description: "Official Tesla Cybertruck Wraps From Github",
    official: true,
  }));

  const foundWraps = await WrapMongoose.find()
    .populate("user", "image name")
    .lean(); // Populate 'user' and fetch only the 'image' field
  const userWraps: Wrap[] = foundWraps.map((wrap) => ({
    ...wrap,
    _id: wrap._id.toString(), // Convert ObjectId to string
    profilePicture: wrap.user?.image || null, // Add profilePicture or fallback to null
    isAuthor: session?.user.id === wrap.user?._id.toString(),
    author: wrap.user?.name,
    user: undefined, // Remove user object to avoid serialization issues
  }));

  const wraps: Wrap[] = officialwraps.concat(userWraps);

  return <WrapsList wraps={wraps} />;
}
