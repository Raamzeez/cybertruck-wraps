"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/app/components/ImageUpload";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createWrap } from "@/app/actions";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState<boolean>(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!uploadedFile) {
      setError("No files selected for upload.");
      return;
    }

    if (!title) {
      return toast.error("Title required");
    }

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = async () => {
        const base64File = reader.result;
        try {
          createWrap(title, base64File, description, anonymous);
          setLoading(false);
          toast.success("Created post successfully");
          return router.push("/");
        } catch (err: any) {
          setLoading(false);
          return toast.error(err.message);
        }
      };
    } catch (error) {
      setLoading(false);
      console.error("Error during file upload:", error);
      setError("Failed to upload the image. Please try again.");
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center w-3/4 p-8 bg-white dark:bg-gray-700 shadow-lg border dark:border-none">
          <Input
            className="w-80"
            placeholder="Title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="mt-5 w-80"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="mt-8 text-sm text-gray-400">
            Your name and profile picture will be displayed if unchecked
          </label>
          <div className="flex items-center justify-center mt-3 space-x-3">
            <Checkbox
              id="terms"
              defaultChecked={true}
              value={String(anonymous)}
              onChange={() => setAnonymous(!anonymous)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Remain Anonymous
            </label>
          </div>
          <div className="w-full h-1 my-10 bg-gray-300" />
          <h3 className="font-semibold text-md dark:text-white">
            Image Guidelines
          </h3>
          <ul className="mt-5 text-gray-400">
            <li>The image must be 1024x768 pixels</li>
            <li>Maximum file size is 1 MB</li>
            <li>
              You can’t use any special characters in the file name, and it must
              be shorter than 30 character
            </li>
            <li>PNG is the only acceptable file format</li>
          </ul>
          <ImageUpload setUploadedFile={setUploadedFile} />
          {uploadedFile && (
            <>
              <h1 className="mt-3 dark:text-white">{uploadedFile.name}</h1>
              <Button
                onClick={handleUpload}
                className="mt-10 w-24 h-12 bg-emerald-500 hover:bg-emerald-700 px-8"
              >
                {loading ? <ClipLoader color="white" size={20} /> : "Submit"}
              </Button>
            </>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreatePost;
