import { BorrowStatus } from "@/utils/constants";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useScroll } from "@/contexts/scroll";
import { useEffect, useMemo, useRef, useState } from "react";
import DepositTableRow from "./table-row";
import { Button } from "@/design-systems/atoms/button";
import { PositionData } from "@/utils/interface";
import { useAccount } from "wagmi";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { calculatePnL } from "@/utils/helpers";

function DepositTable({
  tabPosition,
  positionList,
  setSelectedPosition,
  setIsRebalanceDialogOpen,
  setIsWithdrawDialogOpen,
  isViewPositionOpen,
  setViewPosition,
  isRenewRepayOpen,
  setRenewRepay,
  positionListLoading,
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPages,
  pageSize,
  setPageSize,
  setCurrentPage,
  isSticky,
  isHightlightTab,
  setStakePopUpOpen,
  onClosePosition,
  isClosingPosition,
  spotPriceMap,
  spotPriceLoadingMap,
}: {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  positionListLoading: boolean;
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isRenewRepayOpen: boolean;
  setRenewRepay: (isOpen: boolean) => void;
  setIsRebalanceDialogOpen: (isOpen: boolean) => void;
  setIsWithdrawDialogOpen: (isOpen: boolean) => void;
  tabPosition: "Borrowed" | "Deposited";
  positionList: PositionData[];
  setSelectedPosition: (position: PositionData) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isSticky: boolean;
  isHightlightTab: boolean;
  setStakePopUpOpen: (isOpen: boolean) => void;
  onClosePosition?: (position: PositionData) => void;
  isClosingPosition?: boolean;
  spotPriceMap: Record<string, number>;
  spotPriceLoadingMap: Record<string, boolean>;
}) {
  const [sortBy, setSortBy] = useState<string>("Default");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  // scroll ref for scroll table after deposit
  const scrollRef = useRef<HTMLDivElement>(null);
  // scroll state for scroll table after deposit
  const { isScroll, setIsScroll } = useScroll();

  // handle scroll to bottom of table after deposit
  const scrollToElement = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  // this is for setting currect page for one time if user coming from redirect by deposit
  const [scrollPageSets, setScrollPageSets] = useState(false);

  useEffect(() => {
    // if global scroll state is true then scroll to bottom of table and page
    if (isScroll && !scrollPageSets && totalPages > 0) {
      setCurrentPage(totalPages);
      setScrollPageSets(true);
      const scrollContainer = document.getElementById("body-scroll-container");
      // page scroll to bottom
      if (scrollContainer) {
        scrollContainer.scroll({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
      // table scroll to bottom
      scrollToElement();

      setTimeout(() => {
        setIsScroll(false);
      }, 10000);
    }
  }, [positionList, totalPages]);

  // sort position list based on sortBy and sortAsc and selected column
  const sortedPositionList = useMemo(() => {
    return [...positionList].sort((a, b) => {
      if (sortBy === "amount") {
        return sortAsc
          ? Number(b.depositedAmount) - Number(a.depositedAmount)
          : Number(a.depositedAmount) - Number(b.depositedAmount);
      } else if (sortBy === "Date") {
        return sortAsc
          ? Number(b.depositedTime) - Number(a.depositedTime)
          : Number(a.depositedTime) - Number(b.depositedTime);
      } else if (sortBy === "strike") {
        return sortAsc
          ? Number(b.strikePrice) - Number(a.strikePrice)
          : Number(a.strikePrice) - Number(b.strikePrice);
      } else if (sortBy === "stockPrice") {
        return sortAsc
          ? Number(b.stockPrice) - Number(a.stockPrice)
          : Number(a.stockPrice) - Number(b.stockPrice);
      } else if (sortBy === "expiry") {
        return sortAsc
          ? Number(b.validTill) - Number(a.validTill)
          : Number(a.validTill) - Number(b.validTill);
      } else if (sortBy === "status") {
        const statusOrder = [
          BorrowStatus.LIQUIDATED,
          BorrowStatus.WITHDREW,
          BorrowStatus.STAKED,
          BorrowStatus.UNSTAKED,
          BorrowStatus.DEPOSITED,
        ];
        const aOrder = statusOrder.indexOf(a.status as keyof typeof BorrowStatus);
        const bOrder = statusOrder.indexOf(b.status as keyof typeof BorrowStatus);
        return sortAsc ? bOrder - aOrder : aOrder - bOrder;
      } else if (sortBy === "profit") {
        // Use real-time PnL for sorting for positions where spot price is available
        const aStrike = Number(a.strikePrice);
        const bStrike = Number(b.strikePrice);
        const aSpotPrice = spotPriceMap[a.collateralType] || 0;
        const bSpotPrice = spotPriceMap[b.collateralType] || 0;
        
        const aPnL = calculatePnL(aSpotPrice, aStrike, Number(a.depositedAmount));
        const bPnL = calculatePnL(bSpotPrice, bStrike, Number(b.depositedAmount));
        
        return sortAsc ? bPnL - aPnL : aPnL - bPnL;
      }
      return 0;
    });
  }, [positionList, sortBy, sortAsc, spotPriceMap]);

  return (
    <>
      <div
        ref={scrollRef}
        className={`sm:my-4  overflow-x-scroll xl:overflow-x-clip no-scrollbar ${
          sortedPositionList.length < 3 ? "h-[400px]" : ""
        }`}
      >
        <table className="table-auto   w-full border-collapse text-[20px]">
          <thead
            className={`text-left border-x z-1 border-grayLight bg-white dark:bg-black sm:birder-y-0 font-normal text-grayLight ${
              // if sticky is true then sticky the table header
              isSticky
                ? "xl:sticky top-[80px] nss:top-[52px] md:top-[62px] lg:top-[128px] xl:top-[66px] hxl:top-[66px] 2xl:top-[74px] left-0  right-0 border-grayLight border border-b-[1px] "
                : ""
            }`}
          >
            <tr>
              <th className="pl-5 whitespace-nowrap  font-normal py-3 2xl:py-5 w-1/5 lg:w-auto">
                #
              </th>
              <th className="pl-5 whitespace-nowrap font-normal w-4/5 lg:w-auto">
                Asset
              </th>
              <th
                onClick={() => {
                  setSortBy("amount");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Size (Contracts)</span>
                  <span>
                    {sortAsc && sortBy === "amount" ? (
                      <ChevronDown
                        className={
                          sortBy === "amount"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "amount"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  setSortBy("strike");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Strike Price</span>
                  <span>
                    {sortAsc && sortBy === "strike" ? (
                      <ChevronDown
                        className={
                          sortBy === "strike"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "strike"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  setSortBy("stockPrice");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Current Price</span>
                  <span>
                    {sortAsc && sortBy === "stockPrice" ? (
                      <ChevronDown
                        className={
                          sortBy === "stockPrice"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "stockPrice"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  setSortBy("expiry");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Maturity</span>
                  <span>
                    {sortAsc && sortBy === "expiry" ? (
                      <ChevronDown
                        className={
                          sortBy === "expiry"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "expiry"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  setSortBy("status");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Status</span>
                  <span>
                    {sortAsc && sortBy === "status" ? (
                      <ChevronDown
                        className={
                          sortBy === "status"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "status"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  setSortBy("profit");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>PnL</span>
                  <span>
                    {sortAsc && sortBy === "profit" ? (
                      <ChevronDown
                        className={
                          sortBy === "profit"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "profit"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th className="pr-5 whitespace-nowrap font-normal lg:w-auto text-right">
                Close Position
              </th>
            </tr>
          </thead>
          <tbody className={`font-normal `}>
            {sortedPositionList.map((position: PositionData, key: number) => {
              return (
                <DepositTableRow
                  key={key}
                  idx={key + 1 + (currentPage - 1) * pageSize}
                  position={position}
                  setSelectedPosition={setSelectedPosition}
                  onClosePosition={onClosePosition}
                  isClosingPosition={isClosingPosition}
                  spotPrice={spotPriceMap[position.collateralType]}
                  isSpotPriceLoading={spotPriceLoadingMap[position.collateralType]}
                  highlight={
                    key + 1 === positionList.length &&
                    isScroll &&
                    totalPages == currentPage &&
                    isHightlightTab
                  }
                />
              );
            })}
          </tbody>
        </table>

        {!positionListLoading && positionList.length === 0 ? (
          <div className="border-t flex justify-center items-center  h-[400px] border-x-0 border-b-0 border border-grayLight">
            <Typography size="lg" variant="regular" className="mt-3">
              {address && isConnected
                ? "No Data Available"
                : "Please Connect Wallet"}
            </Typography>
          </div>
        ) : null}
        {positionListLoading ? (
          <div className="border-t flex justify-center items-center  h-[400px]  border-x-0 border-b-0 border border-grayLight">
            <RingLoadingIcon
              width={50}
              height={50}
              className="fill-black dark:fill-white w-8 h-8 "
            />
          </div>
        ) : null}
      </div>
      {positionList.length > 0 && (
        <div className="flex w-full md:w-1/2 xl:w-1/3 mx-auto pb-4  justify-around items-center">
          <Button
            disabled={currentPage === 1}
            className="text-lg"
            variant={"shadowOutline"}
            onClick={() => {
              setIsScroll(false);
              handlePrevPage();
            }}
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
    </>
  );
}

export default DepositTable;
