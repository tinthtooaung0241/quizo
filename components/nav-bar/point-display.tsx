"use client";

import { fetcher } from "@/lib/fetcher";
import { getUser } from "@/lib/queries";
import { useCounterStore } from "@/providers/point-store-provider";
import { useAuth, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect } from "react";
import useSWR from "swr";
const PointDisplay = () => {
  const { point, updatePoint } = useCounterStore((state) => state);
  const { userId } = useAuth();
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<User>(userId ? `/api/user/${userId}` : null, fetcher);
  useEffect(() => {
    if (user?.point !== undefined) {
      updatePoint(user.point);
    }
  }, [user?.point, updatePoint]);

  return (
    <div className="flex items-center justify-center gap-x-1 rounded-full bg-neutral-200 px-2 py-1">
      <Image
        src={"/star.svg"}
        width={30}
        height={30}
        alt="Point"
        className="size-8"
      />
      <p className="mr-2 text-base font-bold">{point}</p>
    </div>
  );
};

export default PointDisplay;
