"use client";

import useDialogStore from "@/store/dialog-store";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import PointDisplay from "./nav-bar/point-display";

const NavBar = () => {
  const router = useRouter();
  const onOpen = useDialogStore((state) => state.onOpen);

  return (
    <div className="mb-8 flex h-20 w-full items-center justify-between bg-white px-20">
      <div className="text-3xl font-bold text-gray-800">
        <Link href={"/"}>Quizo</Link>
      </div>
      <div className="flex items-center justify-evenly gap-x-4">
        <div>
          <Button
            className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => onOpen()}
          >
            More Quiz
          </Button>
        </div>
        <div>
          <Button
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => router.push("/leaderboard")}
          >
            LeaderBoard
          </Button>
        </div>
        <PointDisplay />
        <div className="flex items-center justify-center">
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9", // This sets the size of the userbuttonn
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
