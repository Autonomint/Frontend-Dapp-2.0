"use client";
import { SearchIcon } from "@/design-systems/atoms/SvgIcons";
import { Input } from "@/design-systems/atoms/input";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { WithdrawFund } from "@/design-systems/molecule/popups/WithdrawFund";
import { DcdsWithdrawModal } from "@/design-systems/molecule/popups/WithdrawModal";
import DcdsDepositTable from "@/design-systems/organisms/dashboard/portfolio/dcds-deposit-table";
import DepositTable from "@/design-systems/organisms/dashboard/portfolio/deposit-table";
import PortfolioMetrics from "@/design-systems/organisms/dashboard/portfolio/portfolio-metrics";
import useGetTotalBorrow from "@/hookes/api-hooks/useGetBorrowAmount";
import useGetDcdsDepositList from "@/hookes/api-hooks/useGetDcdsDetails";
import useGetPositionList from "@/hookes/api-hooks/useGetPositionList";

import useGetTotalUserDeposit from "@/hookes/api-hooks/useGetTotalUserDeposit";
import useGetUserPoint from "@/hookes/api-hooks/useGetUserPoint";
import { handleWheel } from "@/utils/helpers";
import { dcdsDepositDetails, PositionData } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";

function PortfolioTemplate() {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();

  const { address, chainId } = useAccount();
  const [tabPosition, setTabPosition] = useState<"Borrowed" | "Deposited">(
    "Borrowed"
  );
  const [refreshLoading, setRefreshLoading] = useState(false);
  const { portfolioTab, setPortfolioTab } = usePortfolioTab();
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(
    null
  );

  const [selectedDcdsPosition, setSelectedDcdsPosition] =
    useState<dcdsDepositDetails | null>(null);

  const [isViewPositionOpen, setViewPosition] = useState(false);
  const [isRenewRepayOpen, setRenewRepay] = useState(false);
  // will handle all this through redux later
  const [isRebalanceDialogOpen, setIsRebalanceDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const { userTotalBorrowAmount } = useGetTotalBorrow();
  const { totalUserDeposit } = useGetTotalUserDeposit();
  const { points, referralPoints } = useGetUserPoint();
  const {
    positionList,
    positionListError,
    positionListRefetch,
    positionListLoading,
    pagedPositionList,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
  } = useGetPositionList();

  console.log(pagedPositionList, "pagedPositionList");

  const {
    dcdsPositionList,
    dcdsPositionListError,
    dcdsPositionListLoading,
    dcdsPositionListRefetch,
    currentPage: dcdsPositionCurrentPage,
    handleNextPage: dcdsHandleNextPage,
    handlePrevPage: dcdsHandlePrevPage,
    pageSize: dcdsPageSize,
    pagedDcdsPositionList: dcdsPagedDcdsPositionList,
    totalPages: dcdsTotalPages,
  } = useGetDcdsDepositList();

  useEffect(() => {
    setTabPosition((portfolioTab || "Borrowed") as typeof tabPosition);
  }, [portfolioTab]);

  const RefreshTableData = async () => {
    const res = await fetch(
      `${BACKEND_API_URL}/borrows/refresh/${chainId}/${address}`,
      {
        method: "POST",
      }
    );
    return res;
  };

  const RefreshTableDataCds = async () => {
    const res = await fetch(
      `${BACKEND_API_URL}/cds/refresh/${chainId}/${address}`,
      {
        method: "POST",
      }
    );
    return res;
  };

  const handleRefresh = async () => {
    try {
      setRefreshLoading(true);
      if (tabPosition == "Borrowed") {
        await RefreshTableData();
        await positionListRefetch();
      }
      if (tabPosition == "Deposited") {
        await RefreshTableDataCds();
        await dcdsPositionListRefetch();
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setRefreshLoading(false);
      }, 1000);
    }
  };

  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);

  // Function to check the scroll position
  const handleScroll = () => {
    const navbarElement = document.getElementById("dashboard-nav");
    // Get the element's position relative to the viewport
    const rect = navbarElement?.getBoundingClientRect();

    // Get the position relative to the document
    const navBarLocal = (rect?.top || 0) + window.pageYOffset;

    const bodyElement = document.getElementById("body-scroll-container");
    const mainHeaderTop = bodyElement?.offsetTop || 0;

    // Check if we've scrolled past the navbar's original position
    if (navBarLocal < mainHeaderTop) {
      setIsSticky(true);
    } else if (navBarLocal > mainHeaderTop) {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const element = document.getElementById("body-scroll-container");
    element?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex sm:px-4 flex-col">
      <div className="grid lg:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Borrowed"
            value={`${userTotalBorrowAmount} USDa`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Deposited"
            value={`$${totalUserDeposit}`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Fee Earned" value="$120" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Points"
            value={(
              Number(referralPoints || 0) + Number(points?.[0] || 0)
            ).toString()}
          />
        </div>
      </div>
      <div
        id="dashboard-nav"
        className={`flex lg:flex-wrap  bg-white dark:bg-black sm:mt-5 ${
          isSticky ? "sticky top-0" : ""
        }`}
      >
        <div
          onClick={() => {
            setTabPosition("Borrowed");
          }}
          className={
            "xl:w-[24%] w-1/2 xl:flex-1 lg:px-5 lg:py-3 p-3 text-center xl:text-left  2xl:text-[32px] text-[18px] font-medium md:text-[24px] border-grayLight border border-r-0 border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Borrowed"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-bottom"
                : ""
            }`
          }
        >
          Borrowed Position
        </div>
        <div
          onClick={() => {
            setTabPosition("Deposited");
          }}
          className={
            "xl:w-[24%] w-1/2 xl:flex-1 text-center xl:text-left  lg:px-5 lg:py-3 p-2 sm:p-3   2xl:text-[32px] text-[18px] md:text-[24px] font-medium border xl:border-r-0 border-grayLight border-r  border-solid hover:cursor-pointer flex items-center justify-center" +
            `${
              tabPosition == "Deposited"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-bottom"
                : ""
            }`
          }
        >
          Deposited Position
        </div>
        <div
          onClick={handleRefresh}
          className="w-1/2 xl:w-[15%] text-center xl:text-left cursor-pointer  justify-center hidden px-5 py-3 lg:flex gap-3 flex-row items-center 2xl:text-[32px] text-[24px] font-medium border-grayLight border  border-r-0 border-solid"
        >
          Refresh
          <div className={`${refreshLoading ? "animate-spin-Refresh" : ""}`}>
            <RefreshCcw />
          </div>
        </div>
        <div className=" w-1/2 xl:w-[39%] hidden text-center xl:text-left lg:flex px-5 py-3 flex-row items-center justify-start  text-[32px] font-medium border-grayLight border  border-solid">
          <SearchIcon width={24} height={24} fontSize={24} />
          <Input
            onWheel={handleWheel}
            className="border-0 md:!text-[24px] 2xl:!text-[32px] ml-2  p-0 !font-normal text-grayLight"
            placeholder="Search Transactions"
          />
        </div>
      </div>
      {tabPosition == "Borrowed" ? (
        <DepositTable
          positionListLoading={positionListLoading}
          setIsRebalanceDialogOpen={setIsRebalanceDialogOpen}
          setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
          setSelectedPosition={setSelectedPosition}
          positionList={pagedPositionList}
          tabPosition={tabPosition}
          isViewPositionOpen={isViewPositionOpen}
          setViewPosition={setViewPosition}
          isRenewRepayOpen={isRenewRepayOpen}
          setRenewRepay={setRenewRepay}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : (
        <DcdsDepositTable
          positionListLoading={dcdsPositionListLoading}
          setIsRebalanceDialogOpen={setIsRebalanceDialogOpen}
          setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
          setSelectedPosition={setSelectedDcdsPosition}
          positionList={dcdsPagedDcdsPositionList || []}
          tabPosition={tabPosition}
          isViewPositionOpen={isViewPositionOpen}
          setViewPosition={setViewPosition}
          isRenewRepayOpen={isRenewRepayOpen}
          setRenewRepay={setRenewRepay}
          handleNextPage={dcdsHandleNextPage}
          handlePrevPage={dcdsHandleNextPage}
          currentPage={dcdsPositionCurrentPage}
          totalPages={dcdsTotalPages}
          pageSize={dcdsPageSize}
          setPageSize={setPageSize}
        />
      )}
      {/* <RebalancePopup
        isDialogOpen={false}
        setIsDialogOpen={() => setIsRebalanceDialogOpen(false)}
      /> */}
      <DcdsWithdrawModal
        position={(selectedDcdsPosition || []) as dcdsDepositDetails}
        isDialogOpen={isWithdrawDialogOpen}
        setIsDialogOpen={() => setIsWithdrawDialogOpen(false)}
      />
      <WithdrawFund
        setSelectedPosition={setSelectedPosition}
        positionListRefetech={positionListRefetch}
        position={(selectedPosition || []) as PositionData}
        isDialogOpen={isRenewRepayOpen}
        setIsDialogOpen={() => setRenewRepay(false)}
      />
    </div>
  );
}

export default WithPrivateRoute(PortfolioTemplate);
