"use client";

import React, { useState } from "react";
import Wrap from "../models/Wrap";
import Controls from "./Controls";
import Card from "./Card";

interface Props {
  wraps: Wrap[];
}

const WrapsList = ({ wraps }: Props) => {
  const [search, setSearch] = useState("");

  const filteredWraps = wraps.filter((wrap) =>
    wrap.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full">
      <Controls onSearch={setSearch} />
      <h1 className="my-2 font-semibold dark:text-white">
        {filteredWraps.length} results
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-3 gap-x-20 gap-y-12 p-4 place-items-center">
        {filteredWraps.map((post) => (
          <Card key={post.image} wrap={post} />
        ))}
      </div>
    </div>
  );
};

export default WrapsList;
