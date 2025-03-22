"use client";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import Leaderboard from "./Leaderboard";

function LeaderboardTemplate() {
  return (
    <div>
      <Leaderboard />
    </div>
  );
}

export default WithPrivateRoute(LeaderboardTemplate);
