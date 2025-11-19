"use client";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { WithdrawFund } from "@/design-systems/molecule/popups/WithdrawFund";
import { DcdsWithdrawModal } from "@/design-systems/molecule/popups/WithdrawModal";
import DcdsDepositTable from "@/design-systems/organisms/dashboard/portfolio/dcds-deposit-table";
import DepositTable from "@/design-systems/organisms/dashboard/portfolio/deposit-table";
import PortfolioMetrics from "@/design-systems/organisms/dashboard/portfolio/portfolio-metrics";
import useGetTotalBorrow from "@/hookes/api-hooks/useGetBorrowAmount";
import useGetDcdsDepositList from "@/hookes/api-hooks/useGetDcdsDetails";
import useGetPositionList from "@/hookes/api-hooks/useGetPositionList";

import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import useGetTotalUserDeposit from "@/hookes/api-hooks/useGetTotalUserDeposit";
import useGetUserPoint from "@/hookes/api-hooks/useGetUserPoint";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useUserGains from "@/hookes/contract-hooks/useUserGains";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { formatNumber } from "@/utils/helpers";
import { dcdsDepositDetails, PositionData } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import useGetOgAddresses from "@/hookes/api-hooks/useGetOgAddresses";
import { useGetStakingPoints } from "@/hookes/api-hooks/useGetStakingPoints";

function PortfolioTemplate() {
  const { address, chainId, isConnected } = useAccount();

  // portfolio current tab
  const [tabPosition, setTabPosition] = useState<"Borrowed" | "Deposited">(
    "Borrowed"
  );
  const [refreshLoading, setRefreshLoading] = useState(false);
  // portfolio tab global state
  const { portfolioTab, setPortfolioTab } = usePortfolioTab();
  // selected position for repay renew
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(
    null
  );

  // selected cds position for withdraw
  const [selectedDcdsPosition, setSelectedDcdsPosition] =
    useState<dcdsDepositDetails | null>(null);
  // open view position dialog
  const [isViewPositionOpen, setViewPosition] = useState(false);
  // open renew repay dialog
  const [isRenewRepayOpen, setRenewRepay] = useState(false);
  // will handle all this through redux later
  const [isRebalanceDialogOpen, setIsRebalanceDialogOpen] = useState(false);
  // open withdraw dialog
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  // get total borrow amount
  const { userTotalBorrowAmount } = useGetTotalBorrow();
  // get total user deposit
  const { totalUserDeposit } = useGetTotalUserDeposit();
  // get user point
  const { points, referralPoints, hasLiquidityLandPoints } = useGetUserPoint();
  const { data: stakingPoints } = useGetStakingPoints(address);

  // get borrowed position list
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
    setCurrentPage,
  } = useGetPositionList();

  // get cds position list
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
    setCurrentPage: dcdsSetCurrentPage,
  } = useGetDcdsDepositList();

  // handle selecting position
  useEffect(() => {
    if (selectedPosition?.index) {
      // find the position in the list
      const updatedData = pagedPositionList.find(
        (position) => position.index === selectedPosition.index
      );
      if (updatedData) {
        setSelectedPosition(updatedData);
      }
    }
    if (selectedDcdsPosition?.index) {
      // find the position in the list
      const updatedData = dcdsPagedDcdsPositionList.find(
        (position) => position.index === selectedDcdsPosition.index
      );
      if (updatedData) {
        setSelectedDcdsPosition(updatedData);
      }
    }
  }, [pagedPositionList, dcdsPagedDcdsPositionList]);

  // handle initial portfolio tab setting based on global tab state
  // this will be when user deposits or borrows and redirect to this page
  useEffect(() => {
    setTabPosition((portfolioTab || "Borrowed") as typeof tabPosition);
  }, [portfolioTab]);

  // refresh borrowed table data for backend data refetch from blockchain
  const RefreshTableData = async () => {
    const res = await fetch(
      `${BACKEND_API_URL}/borrows/refresh/${chainId}/${address}/ETH`,
      {
        method: "POST",
      }
    );

    setTimeout(async () => {
      await fetch(
        `${BACKEND_API_URL}/borrows/refresh/${chainId}/${address}/cbBTC`,
        {
          method: "POST",
        }
      );
      await positionListRefetch();
    }, 3000);

    return res;
  };

  // refresh cds table data for backend data refetch from blockchain
  const RefreshTableDataCds = async () => {
    const res = await fetch(
      `${BACKEND_API_URL}/cds/refresh/${chainId}/${address}/ETH`,
      {
        method: "POST",
      }
    );

    setTimeout(async () => {
      await fetch(
        `${BACKEND_API_URL}/cds/refresh/${chainId}/${address}/cbBTC`,
        {
          method: "POST",
        }
      );
      await dcdsPositionListRefetch();
    }, 3000);
    return res;
  };

  // handle refresh table data based on tab position
  const handleRefresh = async () => {
    try {
      if (!address || !chainId || !isConnected) return;
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
    if (Math.round(navBarLocal) <= mainHeaderTop) {
      setIsSticky(true);
    } else if (Math.round(navBarLocal) > mainHeaderTop) {
      setIsSticky(false);
    }
  };

  // Add event listener to the body element to handle scroll
  useEffect(() => {
    const element = document.getElementById("body-scroll-container");
    element?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // fetching user chain data
  const {
    userGains,
    userGainsLoading,
    userGainsError,
    userGainsFetching,
    userGainsPending,
  } = useUserGains();

  // calculate user gains total
  const userGainsTotal = useMemo(() => {
    if (userGains) {
      return (
        (userGains.priceChangePL < 0 ? 0 : userGains.priceChangePL) +
        userGains.amountAccured +
        userGains.liqGains
      ).toFixed(2);
    }
    return 0;
  }, [userGains]);

  // Checking OG address
  const { ogAddresses } = useGetOgAddresses();
  const isOG = ogAddresses
    ?.map((address) => address.toLowerCase())
    .includes(address?.toLowerCase() || "");

  return (
    <div className="flex sm:px-4 flex-col">
      <div className="grid lg:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Borrowed (All Chain)"
            value={`${userTotalBorrowAmount} USDA+`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Deposited (All Chain)"
            value={`$${formatNumber(totalUserDeposit)}`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Yield Earned (All Chain)"
            value={`$${formatNumber(Number(userGainsTotal))}`}
            isLoading={userGainsFetching}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading={`Points (All Chain)`}
            value={formatNumber(
              Number(referralPoints || 0) +
                Number(points || 0) +
                Number(stakingPoints || 0)
            )}
            hasLiquidityLandPoints={hasLiquidityLandPoints}
            isOG={isOG}
          />
        </div>
      </div>
      <div
        id="dashboard-nav"
        className={`flex lg:flex-wrap  bg-white dark:bg-black sm:mt-5 ${
          isSticky ? "sticky top-0 " : ""
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
          USDA+ Positions
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
          dCDS Positions
        </div>
        <div
          onClick={handleRefresh}
          className={`w-1/2  xl:w-[15%] text-center xl:text-left   justify-center hidden px-5 py-3 lg:flex gap-3 flex-row items-center 2xl:text-[32px] text-[24px] font-medium border-grayLight border  border-r-0 border-solid ${
            isConnected ? "cursor-pointer " : "opacity-50 cursor-not-allowed"
          }`}
        >
          Refresh
          <div className={`${refreshLoading ? "animate-spin-Refresh" : ""}`}>
            <RefreshCcw />
          </div>
        </div>
        <div className=" w-1/2 xl:w-[39%] hidden text-center xl:text-left lg:flex px-5 py-3 flex-row items-center justify-start  text-[32px] font-medium border-grayLight border  border-solid">
          {/* <SearchIcon width={24} height={24} fontSize={24} />
          <Input
            onWheel={handleWheel}
            className="border-0 md:!text-[24px] 2xl:!text-[32px] ml-2  p-0 !font-normal text-grayLight"
            placeholder="Search Transactions"
          /> */}
        </div>
      </div>

      {tabPosition == "Borrowed" ? (
        <DepositTable
          isSticky={isSticky}
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
          setCurrentPage={setCurrentPage}
          isHightlightTab={portfolioTab == "Borrowed"}
        />
      ) : (
        <DcdsDepositTable
          isSticky={isSticky}
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
          handlePrevPage={dcdsHandlePrevPage}
          currentPage={dcdsPositionCurrentPage}
          totalPages={dcdsTotalPages}
          pageSize={dcdsPageSize}
          setPageSize={setPageSize}
          setCurrentPage={dcdsSetCurrentPage}
          isHightlightTab={portfolioTab == "Deposited"}
        />
      )}
      {/* <RebalancePopup
        isDialogOpen={true}
        setIsDialogOpen={() => setIsRebalanceDialogOpen(false)}
      /> */}
      {/* CDS withdraw modal */}
      <DcdsWithdrawModal
        position={(selectedDcdsPosition || []) as dcdsDepositDetails}
        isDialogOpen={isWithdrawDialogOpen}
        setIsDialogOpen={() => {
          setIsWithdrawDialogOpen(false);
          // setSelectedDcdsPosition(null);
        }}
        dcdsPositionListRefetch={dcdsPositionListRefetch}
      />
      {/* Borrow repay renew modal */}
      <WithdrawFund
        setSelectedPosition={setSelectedPosition}
        positionListRefetech={positionListRefetch}
        position={(selectedPosition || []) as PositionData}
        isDialogOpen={isRenewRepayOpen}
        setIsDialogOpen={() => {
          setRenewRepay(false);
          // setSelectedPosition(null);
        }}
      />
    </div>
  );
}

export default WithPrivateRoute(PortfolioTemplate);
