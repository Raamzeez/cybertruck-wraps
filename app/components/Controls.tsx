"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import directDownload from "../lib/directDownload";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Props {
  onSearch: (search: string) => void;
}

const Controls = ({ onSearch }: Props) => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center space-y-7 md:space-y-0 md:space-x-10 mt-2 mb-5">
      <div className="flex justify-center items-center space-x-4">
        <FontAwesomeIcon icon={faSearch} className="fa-fw text-gray-400" />
        <Input
          className="md:w-80"
          placeholder="Search wrap name"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button
        onClick={() =>
          directDownload(
            "https://raw.githubusercontent.com/teslamotors/custom-wraps/refs/heads/master/template/cybertruck/template.png",
            "template.png"
          )
        }
      >
        Download Template
      </Button>
      <Link
        href="https://www.notateslaapp.com/news/2414/how-to-create-your-own-custom-cybertruck-wrap-for-visualizations"
        target="_blank"
      >
        <Button>More Info</Button>
      </Link>
    </div>
  );
};

export default Controls;
