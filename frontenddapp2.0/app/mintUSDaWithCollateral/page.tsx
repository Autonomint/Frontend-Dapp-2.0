import React from "react";
import MintUSDa from "../components/MintUSDa";
import AppNavbar from "../components/AppNavbar";

function page() {
  return (
    <div>
      <AppNavbar hasBackButton={true} />
      <MintUSDa />
    </div>
  );
}

export default page;
