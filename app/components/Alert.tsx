import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Alert = () => {
  return (
    <div className="relative flex items-center w-full shadow-sm rounded bg-gradient-to-r from-red-500 via-red-400 to-orange-400 p-4 mb-4">
      <div className="flex-grow flex justify-center">
        <p className="text-white font-semibold text-xs xxxs:text-sm xxs:text-base ml-5">
          <FontAwesomeIcon
            icon={faWarning}
            fontSize={15}
            className="mr-2"
            color="white"
          />
          This website is currently in beta. Report any bugs to{" "}
          <Link
            href={"mailto:cybertruckwrapsio@gmail.com"}
            className="cursor-pointer hover:underline"
            target="_blank"
          >
            cybertruckwrapsio@gmail.com
          </Link>
        </p>
      </div>
      <div className="shrink-0">
        <FontAwesomeIcon icon={faGithub} fontSize={18} color="white" />
      </div>
    </div>
  );
};

export default Alert;
