import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomDropdown from "../CustomDropdown";
import PopupDropdown from "../PopupDropdown";

export function WithdrawFund({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const [toggleView, setToggleView] = useState("repay");

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[660px] bg-white p-6">
        <div className="text-2xl font-semibold mb-4">Withdraw Fund</div>
        {/* 
        <div className="flex mb-6">
          <label
            className={`w-full flex items-center justify-center py-2 border rounded-l-md cursor-pointer ${
              toggleView === "renew"
                ? "bg-gray-200 border-black"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="toggle"
              value="renew"
              checked={toggleView === "renew"}
              onChange={() => setToggleView("renew")}
              className="hidden"
            />
            <span className="text-lg font-medium">Renew</span>
          </label>

          <label
            className={`w-full flex items-center justify-center py-2 border rounded-r-md cursor-pointer ${
              toggleView === "repay"
                ? "bg-gray-200 border-black"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="toggle"
              value="repay"
              checked={toggleView === "repay"}
              onChange={() => setToggleView("repay")}
              className="hidden"
            />
            <span className="text-lg font-medium">Repay</span>
          </label>
        </div> */}
        <div className="flex">
          <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              onClick={() => setToggleView("repay")}
              checked={toggleView === "repay"}
              name="bordered-radio"
              className="w-6 h-6 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full checked:bg-black checked:bg-black"
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ms-2 text-[32px] font-medium text-grayLight dark:text-textBlack"
            >
              Repay
            </label>
          </div>
          <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              onClick={() => setToggleView("renew")}
              checked={toggleView === "renew"}
              name="bordered-radio"
              className="w-6 h-6 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full checked:bg-black checked:border-black"
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ms-2 text-[32px] font-medium text-grayLight dark:text-textBlack"
            >
              Renew
            </label>
          </div>
        </div>

        {toggleView === "repay" && (
          <>
            <div className="flex justify-between text-[32px] font-medium mb-6">
              <span>USDa Borrowed</span>
              <span>$1,290</span>
            </div>
            <div className="space-y-4">
              {[
                { heading: "ETH Deposited", value: "0.05 (171.32 $)" },
                { heading: "ETH Price at Deposit", value: "3426.33" },
                { heading: "USDa Amount Minted", value: "137.05" },
                {
                  heading: "Total Amount (USDa minted + Interest)",
                  value: "141.95",
                },
                { heading: "Deposit Time APR", value: "5%" },
                { heading: "Deposited Time", value: "28/06/2024, 14:44:24" },
                { heading: "Downside Percentage At Deposit", value: "20%" },
                { heading: "Liquidated?", value: "No" },
                { heading: "Interest Rate Gained", value: "0.00" },
                { heading: "Abond Minted", value: "-" },
                { heading: "Amount Protected", value: "4.5" },
                { heading: "Amount to be returned back", value: "141.95 USDa" },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span className="text-grayLight text-[24px]">
                    {item.heading}
                  </span>
                  <span className="text-textBlack text-[24px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 p-8 bg-black text-white text-[32px]">
              Repay
            </Button>
          </>
        )}

        {toggleView === "renew" && (
          <>
            <div className="mb-4">
              <PopupDropdown />
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-none mt-3 flex overflow-hidden">
              {[
                {
                  label: "Deposit",
                  value: 5,
                  color: "linear-gradient(to right,#478BFF,#00FA96)",
                },
                {
                  label: "Option Fee",
                  value: 0.7,
                  color: "linear-gradient(to right,#05A552,#05A552)",
                },
              ].map((metric, index, arr) => {
                const total = arr.reduce((acc, item) => acc + item.value, 0);
                const percentage = (metric.value / total) * 100;

                return (
                  <div
                    key={index}
                    style={{
                      width: `${percentage}%`,
                      backgroundImage: metric.color,
                    }}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-[24px] text-grayLight font-medium">
              <span className="block w-3 h-3 bg-[#05A552]"></span>
              20 Days remaining till maturity
            </div>
            <div className="space-y-4">
              {[
                { heading: "ETH price at deposit", value: "$3,890" },
                { heading: "Current ETH price", value: "$3,000" },
                { heading: "Downside Protection till now", value: "$90 (10%)" },
                { heading: "Option Fees paid", value: "$19" },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="flex justify-between font-medium"
                >
                  <span className="text-grayLight text-[24px]">
                    {item.heading}
                  </span>
                  <span className="text-textBlack text-[24px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <div className="font-semibold text-textBlack text-[32px]">
                For Renewed
              </div>

              {[
                { label: "Time Period", value: "30 days" },
                { label: "Option Fees", value: "$19" },
                { label: "Downside Protection", value: "Up to $180 (20%)" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between font-medium ">
                  <span className="text-[24px] text-grayLight">
                    {item.label}
                  </span>
                  <span className="text-textBlack text-[24px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 p-8 bg-black text-white text-[32px]">
              Pay
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
