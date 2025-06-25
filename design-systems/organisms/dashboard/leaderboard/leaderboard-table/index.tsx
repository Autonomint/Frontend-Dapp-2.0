import { Button } from "@/design-systems/atoms/button";
import {
  LiquidityLandIcon,
  RingLoadingIcon,
} from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { sortWalletAddress } from "@/utils/helpers";
import { LeaderboardDetails, LeaderboardDetailsList } from "@/utils/interface";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import liquidityLandIcon from "@/app/assets/liquidity-land-logo-png.jpeg";

function LeaderboardTable({
  leaderboardData,
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPages,
  pageSize,
  setPageSize,
  isLeaderboardPending,
}: {
  isLeaderboardPending: boolean;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  leaderboardData: LeaderboardDetailsList[];
}) {
  return (
    <div className="overflow-x-auto min-h-[500px]  ">
      <table className="table-auto w-[700px]  sm:w-full  border-collapse text-[20px]">
        <thead className="text-left font-normal text-grayLight  border-y-0 border-x border-grayLight">
          <tr>
            <th className="pl-5 font-normal py-3 2xl:py-5 w-1/2 lg:w-auto">
              Rank
            </th>
            <th className="pl-5 font-normal w-1/2 lg:w-auto">Address</th>
            <th className="pl-5  table-cell font-normal">Borrowed</th>
            <th className="pl-5  table-cell font-normal">Deposited</th>
            <th className="pl-5  table-cell font-normal">Type</th>
            <th className="pr-5  table-cell text-right font-normal">Points</th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          {leaderboardData.map((item, index) => {
            return (
              <tr
                key={index}
                className={`border border-grayLight ${
                  leaderboardData.length === index + 1 ? "" : ""
                }`}
              >
                <td className="px-5 py-4 2xl:py-6">
                  {index + 1 + (currentPage - 1) * pageSize}
                </td>
                <td className="px-5 py-4 2xl:py-6">
                  {sortWalletAddress(item.address)}
                </td>
                <td className="px-5 py-4 2xl:py-6  table-cell">
                  {item.totalBorrowedAmount
                    ? `$${Number(item.totalBorrowedAmount).toFixed(4)}`
                    : "--"}
                </td>
                <td className="px-5 py-4 2xl:py-6  table-cell">
                  {item.totalDepositedAmount
                    ? `$${Number(item.totalDepositedAmount).toFixed(2)}`
                    : "--"}
                </td>

                <td className="px-5 py-4 2xl:py-6   table-cell font-normal">
                  {!!Number(item.totalBorrowedAmount) && (
                    <span className="bg-[#ABFFDE] border mr-3 border-solid border-grayLight p-2 dark:text-textBlack">
                      Borrower
                    </span>
                  )}
                  {!!Number(item.totalDepositedAmount) && (
                    <span className="bg-[#ABFFDE] border  border-solid border-grayLight p-2 dark:text-textBlack">
                      Deposit
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 2xl:py-6  table-cell font-normal text-right">
                  <div className="flex justify-end  gap-2 items-center">
                    <div>
                      {item.totalPoints
                        ? Math.round(Number(item?.totalPoints || 0))
                        : 0}
                    </div>
                    {item.hasLiquidityLandPoints && (
                      <div className="flex relative  ml-4 items-center w-fit     ">
                        <span className="absolute left-[-20px] z-10 ">
                          <LiquidityLandIcon />
                        </span>
                        <span className="text-black dark:text-white rounded-[24px] pl-4 pr-2  text-[14px] border-[1px] border-grayLight border-l-0 py-[px] mr-2">
                          1.25x
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {leaderboardData.length > 0 && (
        <div className="flex w-full md:w-1/2 xl:w-1/3 mx-auto justify-around my-4 items-center">
          <Button
            disabled={currentPage === 1}
            className="text-lg"
            variant={"shadowOutline"}
            onClick={handlePrevPage}
          >
            <ArrowLeft />
            Prev
          </Button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            disabled={currentPage === totalPages}
            className="text-lg"
            variant={"shadowOutline"}
            onClick={handleNextPage}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      )}

      {!isLeaderboardPending && leaderboardData.length === 0 ? (
        <div className="border-t flex justify-center items-center  h-[400px] border-x-0 border-b-0 border border-grayLight">
          <Typography size="lg" variant="regular" className="mt-3">
            No Data Available
          </Typography>
        </div>
      ) : null}
      {isLeaderboardPending ? (
        <div className="border-t flex justify-center items-center  h-[400px]  border-x-0 border-b-0 border border-grayLight">
          <RingLoadingIcon
            width={50}
            height={50}
            className="fill-black dark:fill-white w-8 h-8 "
          />
        </div>
      ) : null}
    </div>
  );
}

export default LeaderboardTable;
