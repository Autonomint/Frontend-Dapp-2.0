import React from "react";
import Portfolio from "./Portfolio";
import App from "next/app";
import AppNavbar from "@/customComponents/AppNavbar";

function page() {
  return (
    <div>
      <AppNavbar />
      <Portfolio />
    </div>
  );
}

export default page;
