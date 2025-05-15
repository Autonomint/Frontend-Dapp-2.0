import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useScroll } from "@/contexts/scroll";
import { useEffect, useMemo, useRef, useState } from "react";
import DepositTableRow from "./table-row";
import { Button } from "@/design-systems/atoms/button";
import { PositionData } from "@/utils/interface";
import { useAccount } from "wagmi";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import displayNumberWithPrecision from "@/utils/helpers";
import useDeviceType from "@/hookes/useDeviceType";

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
}) {
  const [sortBy, setSortBy] = useState<string>("Default");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  // scroll ref for scroll table after deposit
  const scrollRef = useRef<HTMLDivElement>(null);
  // scroll state for scroll table after deposit
  const { isScroll, setIsScroll } = useScroll();
  // get eth price
  const { usdValue: ethPrice } = useGetUsdValue();

  // handle scroll to bottom of table after deposit
  const scrollToElement = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // if global scroll state is true then scroll to bottom of table and page
    if (isScroll) {
      setCurrentPage(totalPages);
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
  }, [positionList]);

  // calculate position down side protection for every position for sorting in down side protection column
  const positionListDP = positionList.map((position) => {
    let dp = 0;
    if (ethPrice === undefined) {
      dp = 0;
    }
    if (parseFloat(ethPrice.toString()) > position.ethPrice) {
      dp = 0;
    } else if (parseFloat(ethPrice.toString()) < position.ethPrice) {
      // calculate down side protection by multiplying deposited amount with the difference between eth price and current eth price
      const amountProt =
        parseFloat(position.depositedAmount) *
        (position.ethPrice - parseFloat(ethPrice.toString()));
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision((amountProt / 100).toFixed(8))
      );
      dp = amountProtPrecision;
    }
    return {
      ...position,
      dp,
    };
  });

  // sort position list based on sortBy and sortAsc and selected column
  const sortedPositionList = useMemo(() => {
    return positionListDP.sort((a, b) => {
      if (sortBy === "usda") {
        return sortAsc
          ? b.noOfUSDaMinted - a.noOfUSDaMinted
          : a.noOfUSDaMinted - b.noOfUSDaMinted;
      } else if (sortBy === "Date") {
        return (
          new Date(b.depositedTime).getTime() -
          new Date(a.depositedTime).getTime()
        );
      } else if (sortBy === "amount") {
        return sortAsc
          ? Number(b.depositedAmount) - Number(a.depositedAmount)
          : Number(a.depositedAmount) - Number(b.depositedAmount);
      } else if (sortBy === "protected") {
        return sortAsc ? b.dp - a.dp : a.dp - b.dp;
      } else if (sortBy === "abond") {
        return sortAsc
          ? Number(b.noOfAbondMinted) - Number(a.noOfAbondMinted)
          : Number(a.noOfAbondMinted) - Number(b.noOfAbondMinted);
      } else if (sortBy === "liquidation") {
        return sortAsc
          ? b.status === "LIQUIDATED"
            ? -1
            : 1
          : a.status === "LIQUIDATED"
          ? 1
          : -1;
      }
      return 0;
    });
  }, [positionList, sortBy, sortAsc]);

  // get device type
  const deviceType = useDeviceType();

  return (
    <>
      <div
        ref={scrollRef}
        className="sm:my-4  overflow-x-scroll xl:overflow-x-clip no-scrollbar"
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
                ID
              </th>
              <th
                onClick={() => {
                  setSortBy("amount");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal w-4/5 lg:w-auto"
              >
                <div className="flex gap-2 items-center">
                  <span>Asset Deposited </span>
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
                  setSortBy("usda");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>USDA+ Minted </span>
                  <span>
                    {sortAsc && sortBy === "usda" ? (
                      <ChevronDown
                        className={
                          sortBy === "usda"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "usda"
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
                  setSortBy("protected");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Amount Protected</span>
                  <span>
                    {sortAsc && sortBy === "protected" ? (
                      <ChevronDown
                        className={
                          sortBy === "protected"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "protected"
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
                  setSortBy("abond");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>ABond Minted</span>
                  <span>
                    {sortAsc && sortBy === "abond" ? (
                      <ChevronDown
                        className={
                          sortBy === "abond"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "abond"
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
                  setSortBy("liquidation");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 whitespace-nowrap cursor-pointer font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span>Liquidation</span>
                  <span>
                    {sortAsc && sortBy === "liquidation" ? (
                      <ChevronDown
                        className={
                          sortBy === "liquidation"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "liquidation"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th className="pr-5 whitespace-nowrap font-normal lg:w-auto text-right">
                Action
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
                  tabPosition={tabPosition}
                  setSelectedPosition={setSelectedPosition}
                  setIsRebalanceDialogOpen={setIsRebalanceDialogOpen}
                  setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
                  isViewPositionOpen={isViewPositionOpen}
                  setViewPosition={setViewPosition}
                  isLast={key === positionList.length - 1}
                  setRenewRepay={setRenewRepay}
                  highlight={
                    key + 1 === positionList.length &&
                    isScroll &&
                    totalPages == currentPage
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
