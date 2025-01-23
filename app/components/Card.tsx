"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import directDownload from "../lib/directDownload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Wrap from "../models/Wrap";
import { deleteWrap } from "../actions";
import { toast } from "sonner";
import Link from "next/link";

const Card = ({ wrap }: { wrap: Wrap }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    try {
      deleteWrap(wrap._id);
      return toast.success("Wrap deleted successfully");
    } catch (err: any) {
      return toast.error(err.message);
    }
  };

  return (
    <Link
      href={`/posts/${!wrap.official ? wrap._id : wrap.title}`}
      className="relative flex flex-col bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-lg cursor-pointer rounded-md max-w-sm min-h-72 min-w-0 md:min-w-96 p-4 transition-shadow duration-150"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Installation Guidelines</DialogTitle>
            <DialogDescription>
              Grab your USB drive, and create a folder called “Wraps” at the
              root level of the "TSLADRIVE". Places the images in that folder
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
          <button
            onClick={handleDelete}
            className="flex justify-center items-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-700 font-bold shadow-md"
          >
            <FontAwesomeIcon icon={faTrash} className="fa-fw" color="white" />
          </button>
        )}
        <button
          onClick={() => {
            directDownload(wrap.image, wrap.title);
            setOpen(true);
          }}
          className="flex justify-center items-center w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-700 font-bold shadow-md"
        >
          <FontAwesomeIcon icon={faDownload} className="fa-fw" color="white" />
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
        <h1 className="text-xl mt-7 font-bold dark:text-white">{wrap.title}</h1>
        <h5 className="text-xs mt-5 font-semibold text-gray dark:text-white">
          {wrap.description}
        </h5>
        {!wrap.official && (
          <div className="flex justify-around items-center mt-3 space-x-4">
            <h1 className="text-gray-600 dark:text-gray-300 text-xs font-light">
              Date Posted: {new Date().toLocaleDateString()}
            </h1>
            <h1 className="text-gray-600 dark:text-gray-300 text-xs font-light">
              Published by: {!wrap.anonymous ? wrap.author : "Anonymous"}
            </h1>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
