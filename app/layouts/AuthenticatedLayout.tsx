"use client";

import { useSession } from "next-auth/react";
import React from "react";
import AuthButton from "../components/AuthButton";
import { SyncLoader } from "react-spinners";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {status === "loading" && <SyncLoader size={10} color="dodgerblue" />}
      {status !== "loading" && (!session || !session.user) && (
        <>
          <h1 className="font-semibold text-2xl dark:text-white my-8">
            Please login to create a post
          </h1>
          <AuthButton />
        </>
      )}
    </div>
  );

  return <>{children}</>;
};

export default AuthenticatedLayout;
