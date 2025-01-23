import { useSession } from "next-auth/react";
import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-4 shadow-md w-full">
      <div className="flex items-center space-x-8">
        <Link href={"/"}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cybertrucklogo.svg/1280px-Cybertrucklogo.svg.png"
            height={40}
            width={150}
            alt="Cybertruck Logo"
          />
        </Link>
        <Link href={"/posts/create"}>
          <Button className="bg-blue-400 hover:bg-blue-600">Upload</Button>
        </Link>
      </div>
      <AuthButton />
    </div>
  );
};

export default Navbar;
