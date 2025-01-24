"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import validateFilename from "../lib/validateFilename";

interface Props {
  setUploadedFile: (file: File | null) => void;
}

const ImageUpload = ({ setUploadedFile }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);

    if (acceptedFiles.length === 0) {
      setError(
        "No file accepted or invalid file type. Ensure you are uploading only 1 PNG file."
      );
      return;
    }

    const MAX_SIZE = 1024 * 1024;
    if (acceptedFiles.length > 1) {
      setError("Only one image can be uploaded at a time.");
      return;
    }

    const file = acceptedFiles[0];

    if (!validateFilename(file.name)) {
      setError(
        `File name "${file.name}" contains invalid characters. Only alphanumeric characters, dots, underscores, and hyphens are allowed.`
      );
      return;
    }
    if (file.name.length > 30) {
      setError("File name is too long. Max length is 30 characters.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError(`File ${file.name} is too large. Max size is 1 MB.`);
      return;
    }

    if (file.type !== "image/png") {
      setError(`Only a PNG file is allowed. ${file.name} is not a PNG.`);
      return;
    }

    const newUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = newUrl;

    image.onload = () => {
      if (image.width !== 1024 || image.height !== 768) {
        setError(
          `Image resolution must be 1024x768 pixels. Your image is ${image.width}x${image.height} pixels.`
        );
        setPreviewUrl(null);
        setUploadedFile(null);
        return;
      }

      setUploadedFile(file);
      setPreviewUrl(newUrl);
    };

    image.onerror = () => {
      setError("Failed to load the image. Please try again.");
      setPreviewUrl(null);
      setUploadedFile(null);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"] },
    maxFiles: 1,
  });

  return (
    <div className="mt-10 space-y-8 flex flex-col justify-center items-center">
      {!previewUrl && (
        <div
          {...getRootProps()}
          className={`border-dashed border-2 p-4 rounded-md text-center ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="dark:text-white">Drop the file here...</p>
          ) : (
            <p className="dark:text-white">
              Drag and drop a PNG file here, or click to select a file
            </p>
          )}
        </div>
      )}
      {error && <h1 className="text-red-500">{error}</h1>}
      <div className="relative mt-4">
        {previewUrl && (
          <>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              color="red"
              size="1x"
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                setPreviewUrl(null);
                setUploadedFile(null);
              }}
            />
            <img
              src={previewUrl}
              alt="Preview"
              className="h-48 w-48 object-contain"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
