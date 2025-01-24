"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { SyncLoader } from "react-spinners";

export default function AuthButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <SyncLoader size={10} color="dodgerblue" />;
  }

  if (!session || !session.user) {
    return (
      <Button
        className="flex justify-center items-center space-x-2 bg-blue-400 hover:bg-blue-600 shadow-sm"
        onClick={(e) => {
          e.preventDefault();
          signIn("google");
        }}
      >
        <FontAwesomeIcon icon={faGoogle} color="white" />
        <p className="text-sm font-semibold text-white">
          Sign In <span className="hidden xxs:inline">with Google</span>
        </p>
      </Button>
    );
  }

  return (
    <div>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="avatar"
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
          height={100}
          width={100}
        />
      )}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <Link
            href="/posts/create"
            onClick={() => setShowDropdown(!showDropdown)}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none "
          >
            Create Post
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-100 focus:outline-none"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
