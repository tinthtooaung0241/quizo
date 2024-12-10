import { User } from "@/types/travia";
import Image from "next/image";

interface PlayerStatsProps {
  user: User;
  index: number;
}

const PlayerStats = ({ user, index }: PlayerStatsProps) => {
  return (
    <div className="flex w-full flex-1 items-center justify-between rounded-full border-2 border-blue-500 bg-neutral-50 px-4 py-2 shadow-[4px_4px_0px_0px_rgba(37,99,235,0.5)] transition-all duration-200 hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(37,99,235,0.5)]">
      <div className="flex items-center gap-x-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full text-xl font-bold text-blue-900">
          {index + 1}
        </div>
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:scale-110">
          <Image
            src={user.imageUrl}
            alt="user profile image"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-lg font-bold text-neutral-800">{user.name}</div>
      </div>
      <div className="text-base font-medium text-blue-700">{user.point}</div>
    </div>
  );
};

export default PlayerStats;
