import { Button } from "@/design-systems/atoms/button";
import {
  LiquidityLandIcon,
  RingLoadingIcon,
} from "@/design-systems/atoms/SvgIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import useGetOgAddresses from "@/hookes/api-hooks/useGetOgAddresses";
import { formatNumber, sortWalletAddress } from "@/utils/helpers";
import { LeaderboardDetails, LeaderboardDetailsList } from "@/utils/interface";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const { ogAddresses } = useGetOgAddresses();

  return (
    <div>
      <div className="overflow-x-auto min-h-[500px]  ">
        <table className="table-auto w-[700px]  sm:w-full  border-collapse text-lg md:text-[20px]">
          <thead className="text-left font-normal text-grayLight  border-y-0 border-x border-grayLight">
            <tr>
              <th className="pl-5 font-normal py-3 2xl:py-5 w-1/2 lg:w-auto">
                Rank
              </th>
              <th className="pl-5 font-normal w-1/2 lg:w-auto">Address</th>
              <th className="pl-5  table-cell font-normal">USDA+ minted</th>
              <th className="pl-5  table-cell font-normal">Deposited</th>
              <th className="pl-5   font-normal sm:table-cell hidden">Type</th>
              <th className="pr-5  table-cell text-right font-normal">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="font-normal ">
            {leaderboardData.map((item, index) => {

              // Checking OG address
              const isOG = ogAddresses?.map((address) => address.toLowerCase()).includes(item.address?.toLowerCase() || "");
              return (
                <tr
                  key={index}
                  className={`border border-grayLight ${leaderboardData.length === index + 1 ? "" : ""
                    }`}
                >
                  <td className="px-5 py-4 2xl:py-6">
                    {index + 1 + (currentPage - 1) * pageSize}
                  </td>
                  <td className="px-5 py-4 2xl:py-6">
                    <div className="flex gap-2">

                      {sortWalletAddress(item.address)}

                      {isOG && <div className="flex relative  items-center w-fit   ml-[-px]  ">
                        <span className="absolute  z-10 ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ABFFDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-star-icon lucide-circle-star"><path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" /><circle cx="12" cy="12" r="10" /></svg>
                        </span>
                        <span className="text-black dark:text-white rounded-[24px] pl-6 pr-2 py-[0px] text-[14px] border-[1px] border-grayLight mr-2">
                          OG
                        </span>
                      </div>}
                    </div>
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
                      {item.hasLiquidityLandPoints && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex relative  ml-4 items-center w-fit     ">
                              <span className="absolute left-[-20px] z-10 ">
                                <LiquidityLandIcon />
                              </span>
                              <span className="text-black dark:text-white rounded-[24px] pl-4 pr-2  text-[14px] border-[1px] border-grayLight border-l-0 py-[px] mr-2">
                                1.25x
                              </span>
                            </div>
                          </TooltipTrigger>
                          {
                            <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                              Liquidity Land Booster
                            </TooltipContent>
                          }
                        </Tooltip>
                      )}

                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              {item.totalPoints
                                ? formatNumber(
                                  Math.round(Number(item?.totalPoints || 0))
                                )
                                : 0}
                            </div>
                          </TooltipTrigger>
                          {
                            <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                              {item.totalPoints
                                ? Math.round(Number(item?.totalPoints || 0))
                                : 0}
                            </TooltipContent>
                          }
                        </Tooltip>
                      </div>
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
    </div>
  );
}

export default LeaderboardTable;
