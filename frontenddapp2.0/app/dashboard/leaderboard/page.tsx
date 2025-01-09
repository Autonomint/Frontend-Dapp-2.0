import React from "react";
import Leaderboard from "./Leaderboard";
import AppNavbar from "@/customComponents/AppNavbar";

function page() {
  return (
    <div>
      <AppNavbar />
      <Leaderboard />
    </div>
  );
}

export default page;
