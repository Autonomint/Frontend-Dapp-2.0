import React from "react";
import { ChartComponent } from "./ChartComponent";
function page() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 -mt-6">
      <div>
        <ChartComponent title="USDa Price Chart" timeFrame="All Time" />
      </div>
      <div>
        <ChartComponent title="  USDa Supply Chart" timeFrame="1Y" />
      </div>
      <div>
        <ChartComponent title="ABOND" timeFrame="All Time" />
      </div>
      <div>
        <ChartComponent title="Value Locked" timeFrame="1M" />
      </div>
      <div>
        <ChartComponent title="Ratio of Collaterals" timeFrame="10M" />
      </div>
    </div>
  );
}

export default page;
