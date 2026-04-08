#!/usr/bin/env node

// Script to find and fix setTimeout memory leaks across the codebase
import fs from "fs";
import path from "path";

const filesToCheck = [
  "design-systems/organisms/dashboard/portfolio/dcds-deposit-table/index.tsx",
  "design-systems/organisms/dashboard/portfolio/deposit-table/index.tsx",
  "design-systems/organisms/mint-page/input-form/index.tsx",
  "design-systems/molecule/popups/WithdrawModal.tsx",
  "design-systems/molecule/popups/WithdrawFund.tsx",
  "design-systems/templates/dashboard/portfolio/index.tsx",
  "design-systems/templates/redeem/index.tsx",
];

console.log("🔍 Checking for setTimeout memory leaks...\n");

filesToCheck.forEach((file) => {
  try {
    const content = fs.readFileSync(file, "utf8");
    const setTimeoutMatches = content.match(/setTimeout\s*\([^)]+\)/g) || [];

    if (setTimeoutMatches.length > 0) {
      console.log(
        `⚠️  ${file}: Found ${setTimeoutMatches.length} setTimeout calls`,
      );
      console.log(`   Consider adding cleanup to prevent memory leaks\n`);
    }
  } catch (error) {
    console.log(`❌ Could not read ${file}: ${error.message}`);
  }
});

console.log("💡 To fix memory leaks:");
console.log("1. Add useRef for timeout storage");
console.log("2. Store timeout IDs in ref array");
console.log("3. Clear all timeouts in useEffect cleanup");
console.log("4. Clear timeouts on component unmount");
