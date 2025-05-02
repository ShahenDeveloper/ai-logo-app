"use client";
import { UserDetailContex } from "../../_context/UserDetailContext";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../../../components/ui/button";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl text-primary">
          Hello, {userDetail?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Image src={"/coin.png"} alt="coin" width={40} height={40} />
          <h2 className="font-bold text-lg sm:text-2xl">
            {userDetail?.credits} Credit Left
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-bold text-xl sm:text-2xl">Dashboard</h2>
        <Link href="/create">
          <Button className="w-full sm:w-auto">+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
