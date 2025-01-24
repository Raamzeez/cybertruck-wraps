"use client";

import React, { useState } from "react";
import Image from "next/image";
import directDownload from "../lib/directDownload";
import Wrap from "../models/Wrap";
import { Button } from "@/components/ui/button";
import { deleteWrap } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InstallationModal from "./InstallationModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const LargeCard = ({ wrap }: { wrap: Wrap }) => {
  const [downloadModal, setDownloadModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteWrap(wrap._id);
      toast.success("Deleted wrap successfully!");
      return router.push("/");
    } catch (err: any) {
      return toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-evenly space-x-10 px-5">
      <div>
        <InstallationModal
          open={downloadModal}
          onOpenChange={setDownloadModal}
        />
        <ConfirmDeleteModal
          open={deleteModal}
          onOpenChange={setDeleteModal}
          handleDelete={handleDelete}
        />
        <Image
          src={wrap.image}
          height={400}
          width={400}
          alt="Cybertruck Wrap"
          className="mt-5 mx-auto"
        />
        <div className="mt-16 flex justify-around">
          <Button
            className="bg-emerald-400 hover:bg-emerald-600"
            onClick={() => {
              directDownload(wrap.image, wrap.filename);
              setDownloadModal(true);
            }}
          >
            Download
          </Button>
          {wrap.isAuthor && (
            <Button
              className="bg-red-400 hover:bg-red-600"
              onClick={() => setDeleteModal(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-5 justify-center items-start">
          <h1 className="text-3xl mt-12 sm:mt-7 font-bold dark:text-white">
            {wrap.title}
          </h1>
          <div className="flex items-center space-x-3">
            <h1 className="text-lg text-gray-600 dark:text-gray-300 font-light">
              Published by: {!wrap.anonymous ? wrap.author : "Anonymous"}
            </h1>
            <Image
              src={
                wrap.official
                  ? "https://www.svgrepo.com/show/331599/tesla.svg"
                  : !wrap.anonymous
                  ? wrap.profilePicture ??
                    "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png"
                  : "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png"
              }
              height={30}
              width={30}
              alt="Tesla Logo"
              className="rounded-full"
            />
          </div>
          {!wrap.official && (
            <h1 className="text-lg text-gray-600 dark:text-gray-300 font-light">
              Date Posted: {wrap.createdAt.toLocaleDateString()}
            </h1>
          )}
          <h5 className="text-lg mt-5 text-gray-600 dark:text-gray-300 font-light">
            Description: {wrap.description}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
