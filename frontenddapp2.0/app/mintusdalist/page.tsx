import React from "react";
import MintUSDaList from "../components/MintUSDaList";
import AppNavbar from "../components/AppNavbar";

function page() {
  return (
    <div className="h-full">
      <AppNavbar hasBackButton={false} />
      <MintUSDaList />
    </div>
  );
}

export default page;
