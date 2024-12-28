import React from "react";

function PortfolioMetrics({
  subHeading,
  value,
}: {
  subHeading: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex flex-col p-5 gap-4 border border-solid">
      <span className="text-textBlack text-[32px] font-medium font-plex-grotesk">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] font-plex-grotesk">
        {subHeading}
      </span>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Borrowed" value="$1,290" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Deposited" value="$2,320" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Fee Earned" value="$120" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Points" value="89,027" />
        </div>
      </div>
      <div className="grid md:grid-cols-12 grid-cols-2">
        <div className="col-span-3 px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid">
          Borrowed Position
        </div>
        <div className="col-span-3 px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid">
          Deposited Position
        </div>
        <div className=" col-span-1 px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid"></div>
        <div className="col-span- px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid">
          Search
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
