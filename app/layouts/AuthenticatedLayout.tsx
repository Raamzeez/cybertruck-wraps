"use client";

import { useSession } from "next-auth/react";
import React from "react";
import AuthButton from "../components/AuthButton";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="font-semibold text-2xl dark:text-white my-8">
          Please login to create a post
        </h1>
        <AuthButton />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
