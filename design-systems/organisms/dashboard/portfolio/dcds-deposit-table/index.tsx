import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useScroll } from "@/contexts/scroll";
import { useEffect, useMemo, useRef, useState } from "react";
import DcdsPositionTableRow from "./dcds-position-table-row";
import { Button } from "@/design-systems/atoms/button";
import { dcdsDepositDetails } from "@/utils/interface";
import { useAccount } from "wagmi";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

function DcdsDepositTable({
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
  isSticky,
  setCurrentPage,
  isHightlightTab,
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
  positionList: dcdsDepositDetails[];
  setSelectedPosition: (position: dcdsDepositDetails) => void;
  isSticky: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isHightlightTab: boolean;
}) {
  const [sortBy, setSortBy] = useState<string>("Default");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isScroll, setIsScroll } = useScroll();

  // handle scroll for table
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

  // calling scroll for new deposit
  useEffect(() => {
    if (isScroll && !scrollPageSets && totalPages > 0) {
      setCurrentPage(totalPages);
      setScrollPageSets(true);
      const scrollContainer = document.getElementById("body-scroll-container");
      if (scrollContainer) {
        scrollContainer.scroll({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
      scrollToElement();

      setTimeout(() => {
        setIsScroll(false);
      }, 10000);
    }
  }, [positionList, totalPages]);

  // sorting position based on selected table column
  const sortedPositionList = useMemo(() => {
    return positionList.sort((a, b) => {
      if (sortBy === "deposit") {
        const depositB =
          Number(b.depositedAmounts.usda) +
          Number(b.depositedAmounts.usdt) +
          Number(b.depositedAmounts.nativeToken) *
            Number(b.nativeTokenPriceAtDeposit);
        const depositA =
          Number(a.depositedAmounts.usda) +
          Number(a.depositedAmounts.usdt) +
          Number(a.depositedAmounts.nativeToken) *
            Number(a.nativeTokenPriceAtDeposit);
        return sortAsc ? depositB - depositA : depositA - depositB;
      } else if (sortBy === "time") {
        return sortAsc
          ? Number(b.depositedTime) - Number(a.depositedTime)
          : Number(a.depositedTime) - Number(b.depositedTime);
      }

      return 0;
    });
  }, [positionList, sortBy, sortAsc]);

  return (
    <>
      <div
        ref={scrollRef}
        className={`sm:my-4 overflow-x-scroll xl:overflow-x-clip   no-scrollbar  ${
          sortedPositionList.length < 3 ? "h-[400px]" : ""
        }`}
      >
        <table className="table-auto  w-full border-collapse text-[20px]">
          <thead
            className={` text-left font-normal sm:border-y-0 bg-white dark:bg-black sm:border-x border-grayLight text-grayLight ${
              isSticky
                ? "xl:sticky top-[80px] nss:top-[52px] md:top-[62px] lg:top-[128px] xl:top-[66px] hxl:top-[66px] 2xl:top-[74px] left-0  right-0 border-grayLight border border-b-[1px]  "
                : ""
            } `}
          >
            <tr>
              <th className="pl-5 whitespace-nowrap font-normal py-3 2xl:py-5 ">
                ID
              </th>
              <th
                onClick={() => {
                  setSortBy("deposit");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 cursor-pointer whitespace-nowrap font-normal "
              >
                <div className="flex gap-2 items-center">
                  <span> Total Deposit </span>
                  <span>
                    {sortAsc && sortBy === "deposit" ? (
                      <ChevronDown
                        className={
                          sortBy === "deposit"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "deposit"
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
                  setSortBy("time");
                  setSortAsc(!sortAsc);
                }}
                className="pl-5 cursor-pointer whitespace-nowrap  font-normal"
              >
                <div className="flex gap-2 items-center">
                  <span> Deposited Time </span>
                  <span>
                    {sortAsc && sortBy === "time" ? (
                      <ChevronDown
                        className={
                          sortBy === "time"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    ) : (
                      <ChevronUp
                        className={
                          sortBy === "time"
                            ? "stroke-black dark:stroke-white"
                            : ""
                        }
                      />
                    )}
                  </span>
                </div>
              </th>
              <th className="pl-5 whitespace-nowrap  font-normal">
                Lock In period
              </th>
              <th className="pl-5 whitespace-nowrap text-right pr-5  font-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-normal ">
            {sortedPositionList.map(
              (position: dcdsDepositDetails, key: number) => {
                return (
                  <DcdsPositionTableRow
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
                      totalPages === currentPage &&
                      isHightlightTab
                    }
                  />
                );
              }
            )}
          </tbody>
        </table>

        {!positionListLoading && positionList.length === 0 ? (
          <div className="border-t flex justify-center h-[400px] items-center  border-x-0 border-b-0 border border-grayLight">
            <Typography size="lg" variant="regular" className="mt-3">
              {address && isConnected
                ? "No Data Available"
                : "Please Connect Wallet"}
            </Typography>
          </div>
        ) : null}
        {positionListLoading ? (
          <div className="border-t flex justify-center h-[400px] items-center  border-x-0 border-b-0 border border-grayLight">
            <RingLoadingIcon
              width={50}
              height={50}
              className="fill-black dark:fill-white w-8 h-8 "
            />
          </div>
        ) : null}
      </div>
      {positionList.length > 0 && (
        <div className="flex w-full md:w-1/2 xl:w-1/3 mx-auto pb-4 justify-around items-center">
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
    </>
  );
}

export default DcdsDepositTable;
