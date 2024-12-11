import { getUsers } from "@/lib/queries";
import PlayerStats from "./player-stats";
import { User } from "@/types/travia";

interface LeaderboardListPorps {
  users: User[];
}

export default function LeaderboardList({ users }: LeaderboardListPorps) {
  if (users.length === 0) {
    return <div>No users found. Please try again later.</div>;
  }
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[450px] flex-col gap-y-4 rounded-xl border border-black bg-amber-50 p-5">
        <h1 className="w-full text-center text-2xl font-bold">Leaderboard</h1>
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center gap-x-4 transition-all duration-200 ease-in-out hover:odd:rotate-1 hover:even:-rotate-1"
          >
            <PlayerStats user={user} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
