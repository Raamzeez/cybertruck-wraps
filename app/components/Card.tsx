"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import directDownload from "../lib/directDownload";
import Wrap from "../models/Wrap";
import { deleteWrap } from "../actions";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InstallationModal from "./InstallationModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Card = ({ wrap }: { wrap: Wrap }) => {
  const [downloadModal, setDownloadModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = () => {
    try {
      deleteWrap(wrap._id);
      return toast.success("Wrap deleted successfully");
    } catch (err: any) {
      return toast.error(err.message);
    }
  };

  return (
    <>
      <InstallationModal open={downloadModal} onOpenChange={setDownloadModal} />
      <ConfirmDeleteModal
        open={deleteModal}
        onOpenChange={setDeleteModal}
        handleDelete={handleDelete}
      />
      <Link
        href={`/posts/${!wrap.official ? wrap._id : wrap.sha}`}
        className="relative flex flex-col bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-lg cursor-pointer rounded-md max-w-sm min-h-72 min-w-0 md:min-w-96 p-4 transition-shadow duration-150"
      >
        <div className="flex justify-between">
          <Image
            src={
              wrap.official
                ? "https://www.svgrepo.com/show/331599/tesla.svg"
                : !wrap.anonymous
                ? wrap.profilePicture ??
                  "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png"
                : "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png"
            }
            height={36}
            width={36}
            alt="Tesla Logo"
            className="rounded-full"
          />
          {wrap.isAuthor && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDeleteModal(true);
              }}
              className="flex justify-center items-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-700 font-bold shadow-md"
            >
              <FontAwesomeIcon icon={faTrash} className="fa-fw" color="white" />
            </Button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              directDownload(wrap.image, wrap.filename);
              setDownloadModal(true);
            }}
            className="flex justify-center items-center w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-700 font-bold shadow-md"
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="fa-fw"
              color="white"
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={wrap.image}
            height={200}
            width={200}
            alt="Cybertruck Wrap"
            className="mt-5"
          />
          <h1 className="text-xl mt-7 font-bold dark:text-white">
            {wrap.title}
          </h1>
          <h5 className="text-xs mt-5 font-semibold text-gray dark:text-white">
            {wrap.description}
          </h5>
          {!wrap.official && (
            <div className="flex justify-around items-center mt-3 space-x-4">
              <h1 className="text-gray-600 dark:text-gray-300 text-xs font-light">
                Date Posted: {wrap.createdAt.toLocaleDateString()}
              </h1>
              <h1 className="text-gray-600 dark:text-gray-300 text-xs font-light">
                Published by: {!wrap.anonymous ? wrap.author : "Anonymous"}
              </h1>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Card;
