import Wrap from "./models/Wrap";
import WrapsList from "./components/WrapsList";
import { connectToDatabase } from "../lib/mongodb";
import { getServerSession } from "next-auth/next";
import WrapMongoose from "./models/WrapMongoose";
import { authOptions } from "./lib/auth";
import Error from "./components/Error";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);

    await connectToDatabase();

    const foundWraps = await WrapMongoose.find()
      .populate("user", "image name")
      .lean();
    const wraps: Wrap[] = foundWraps.map((wrap) => ({
      ...wrap,
      _id: wrap._id.toString(),
      // @ts-ignore
      profilePicture: wrap.user?.image || null,
      // @ts-ignore
      isAuthor: session?.user.id === wrap.user?._id.toString(),
      // @ts-ignore
      author: wrap.user?.name,
      user: undefined,
      anonymous: wrap.anonymous,
      official: wrap.official,
    }));

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
