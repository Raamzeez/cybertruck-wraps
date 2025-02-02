import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import WrapMongoose from "@/app/models/WrapMongoose";
import axios from "axios";
import shaToObjectId from "@/app/lib/shaToObjectId";

const fetchAndStoreWraps = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/teslamotors/custom-wraps/contents/example/cybertruck"
    );
    const json = response.data;

    if (!Array.isArray(json)) {
      throw new Error("GitHub API response was not an array");
    }

    await connectToDatabase();

    for (const wrap of json) {
      const wrapData = {
        _id: shaToObjectId(wrap.sha),
        filename: wrap.name.split("_").join(""),
        title: (wrap.path.split("/").pop() as string)
          .split("_")
          .join(" ")
          .split(".")
          .slice(0, -1)
          .join(""),
        image: wrap.download_url,
        description: "Official Tesla Cybertruck Wrap From Github",
        anonymous: false,
        author: "Tesla Motors",
        official: true,
      };

      await WrapMongoose.findOneAndUpdate({ _id: wrapData._id }, wrapData, {
        upsert: true,
        new: true,
      });
    }

    return json.length;
  } catch (error) {
    console.error("Error fetching wraps:", error);
    throw error;
  }
};

export async function GET() {
  try {
    const wrapsCount = await fetchAndStoreWraps();
    return NextResponse.json({
      success: true,
      message: "Wraps fetched and stored successfully",
      count: wrapsCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
