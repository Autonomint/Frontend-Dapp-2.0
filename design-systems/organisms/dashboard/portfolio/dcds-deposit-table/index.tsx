import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useScroll } from "@/contexts/scroll";
import { useEffect, useRef } from "react";
import DcdsPositionTableRow from "./dcds-position-table-row";
import { Button } from "@/design-systems/atoms/button";
import { dcdsDepositDetails } from "@/utils/interface";

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
}) {
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
      <table className="table-auto  w-full border-collapse text-[20px]">
        <thead className="text-left font-normal sm:border-y-0 sm:border-x border-grayLight text-grayLight ">
          <tr>
            <th className="pl-5 whitespace-nowrap font-normal py-3 2xl:py-5 ">
              ID
            </th>
            <th className="pl-5 whitespace-nowrap font-normal ">
              USDa / Usdt Deposited
            </th>
            <th className="pl-5 whitespace-nowrap  font-normal">
              Deposited Time
            </th>
            <th className="pl-5 whitespace-nowrap  font-normal">
              Lock In period
            </th>
            <th className="pl-5 whitespace-nowrap  font-normal">Withdraw</th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          {positionList.map((position: dcdsDepositDetails, key: number) => {
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
                highlight={key + 1 === positionList.length && isScroll}
              />
            );
          })}
        </tbody>
      </table>
      {positionList.length > 0 && (
        <div className="flex my-4 md:my-0 justify-around items-center">
          <Button
            disabled={currentPage === 1}
            className="text-lg"
            variant={"shadowOutline"}
            onClick={handlePrevPage}
          >
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
          </Button>
        </div>
      )}
      {!positionListLoading && positionList.length === 0 ? (
        <div className="border-t flex justify-center h-[400px] items-center  border-x-0 border-b-0 border border-grayLight">
          <Typography size="lg" variant="regular" className="mt-3">
            No Data Available
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
  );
}

export default DcdsDepositTable;
