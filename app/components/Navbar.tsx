import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faHome } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const { width } = useWindowDimensions();

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-4 shadow-md w-full">
      <div className="flex items-center space-x-8">
        <Link href={"/"}>
          {(width < 500 && (!session || !session.user)) || width < 350 ? (
            <div className="p-3 h-10 w-10 flex justify-center items-center rounded-full hover:shadow bg-gray-500 hover:bg-gray-600">
              <FontAwesomeIcon icon={faHome} color="white" />
            </div>
          ) : (
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cybertrucklogo.svg/1280px-Cybertrucklogo.svg.png"
              height={40}
              width={110}
              alt="Cybertruck Logo"
            />
          )}
        </Link>
        <Link href={"/posts/create"}>
          <Button className="bg-blue-400 hover:bg-blue-600 hover:shadow-lg mx-3">
            <FontAwesomeIcon icon={faFileUpload} color="white" />
            {width > 300 && <span>Upload</span>}
          </Button>
        </Link>
      </div>
      <AuthButton />
    </div>
  );
};

export default Navbar;
