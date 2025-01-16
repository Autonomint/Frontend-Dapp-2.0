import React from "react";
import { ChartComponent, data, options } from "./ChartComponent";
import RatioOfCollaterals from "./RatioOfCollaterals";
import { Line } from "react-chartjs-2";
function page() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 -mt-6">
      <div>
        <ChartComponent
          title="USDa Price Chart"
          timeFrame="All Time"
          hideElements={false}
        />
      </div>
      <div>
        <ChartComponent
          title="  USDa Supply Chart"
          timeFrame="1Y"
          hideElements={false}
        />
      </div>
      <div>
        <ChartComponent
          title="ABOND"
          timeFrame="All Time"
          hideElements={false}
        />
      </div>
      <div>
        <ChartComponent
          title="Value Locked"
          timeFrame="1M"
          hideElements={false}
        />
      </div>
      <div className="md:col-span-2 col-span-1">
        <RatioOfCollaterals timeFrame="10M" />
      </div>
    </div>
  );
}

export default page;
