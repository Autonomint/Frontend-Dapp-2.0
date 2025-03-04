import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useScroll } from "@/contexts/scroll";
import { useEffect, useRef } from "react";
import DepositTableRow from "./table-row";
import { Button } from "@/design-systems/atoms/button";
import { PositionData } from "@/utils/interface";
import { useAccount } from "wagmi";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
}) {
  const { address, isConnected } = useAccount();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isScroll, setIsScroll } = useScroll();
  const scrollToElement = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isScroll) {
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
  }, [positionList]);
  return (
    <div ref={scrollRef} className="sm:my-4 overflow-x-auto   no-scrollbar">
      <table className="table-auto w-full border-collapse text-[20px]">
        <thead className="text-left border-x border-grayLight sm:birder-y-0 font-normal text-grayLight ">
          <tr>
            <th className="pl-5 whitespace-nowrap  font-normal py-3 2xl:py-5 w-1/5 lg:w-auto">
              ID
            </th>
            <th className="pl-5 whitespace-nowrap font-normal w-4/5 lg:w-auto">
              ETH Deposited
            </th>
            <th className="pl-5 whitespace-nowrap font-normal">USDa Minted</th>
            <th className="pl-5 whitespace-nowrap font-normal">
              Amount Protected
            </th>
            <th className="pl-5 whitespace-nowrap font-normal">Abond Minted</th>
            <th className="pl-5 whitespace-nowrap font-normal">Liquidation</th>
            <th className="pr-5 whitespace-nowrap font-normal lg:w-auto text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          {positionList.map((position: PositionData, key: number) => {
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
                highlight={key + 1 === positionList.length && isScroll}
              />
            );
          })}
        </tbody>
      </table>

      {positionList.length > 0 && (
        <div className="flex w-full md:w-1/2 xl:w-1/3 mx-auto my-4 md:mb-0 justify-around items-center">
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
  );
}

export default DepositTable;
