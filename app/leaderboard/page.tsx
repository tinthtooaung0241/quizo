import { getUsers } from "@/lib/queries";
import React, { use } from "react";
import LeaderboardList from "./components/leaderboard-lits";

const LeaderBoard = async () => {
  const users = await getUsers();
  return <LeaderboardList users={users} />;
};

export default LeaderBoard;
