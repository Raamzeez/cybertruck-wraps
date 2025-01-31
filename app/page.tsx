import Wrap from "./models/Wrap";
import WrapsList from "./components/WrapsList";
import { connectToDatabase } from "../lib/mongodb";
import { getServerSession } from "next-auth/next";
import WrapMongoose from "./models/WrapMongoose";
import OfficialWrap from "./models/OfficialWrap";
import { authOptions } from "./lib/auth";
import Error from "./components/Error";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);

    await connectToDatabase();

    const response = await fetch(
      "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
    );
    const json: OfficialWrap[] = await response.json();
    // @ts-ignore
    const officialwraps: Wrap[] = json.map((wrap) => ({
      sha: wrap.sha,
      filename: wrap.name.split("_").join(""),
      title: (wrap.path.split("/").pop() as string)
        .split("_")
        .join(" ")
        .split(".")
        .slice(0, -1)
        .join(""),
      image: wrap.download_url,
      description: "Official Tesla Cybertruck Wrap From Github",
      official: true,
    }));

    const foundWraps = await WrapMongoose.find()
      .populate("user", "image name")
      .lean();
    const userWraps: Wrap[] = foundWraps.map((wrap) => ({
      ...wrap,
      _id: wrap._id.toString(),
      // @ts-ignore
      profilePicture: wrap.user?.image || null,
      // @ts-ignore
      isAuthor: session?.user.id === wrap.user?._id.toString(),
      // @ts-ignore
      author: wrap.user?.name,
      user: undefined,
    }));

    const wraps: Wrap[] = officialwraps.concat(userWraps);

    return <WrapsList wraps={wraps} />;
  } catch (error) {
    console.error(error);
    return (
      <Error
        message="Critical Error - Please try again later"
        showHomeButton={false}
      />
    );
  }
}
