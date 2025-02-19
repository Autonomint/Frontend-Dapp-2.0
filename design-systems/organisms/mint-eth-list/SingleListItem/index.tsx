import { Button } from "@/design-systems/atoms/button";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/app/assets/arrow-right-02.png";
import { motion } from "framer-motion";
import SingleListItemImage from "../SingleListItemImage";
import ListItemMetric from "../ListItemMetric";

const listItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

function SingleListItem({
  item,
  indexVal,
}: {
  //@ts-ignore
  item: ListItem;
  indexVal: number;
}) {
  const metrics = [
    {
      label: "Borrow Rate",
      value: item.BorrowRate,
      tooltipText:
        "The current yearly interest rate charged on stablecoin USDa loan",
    },
    {
      label: "LTV",
      value: item.ltv,
      tooltipText: "USDa borrowing limit per unit of collateral",
    },
    {
      label: "Downside Protection",
      value: item.DownsideProtectionGiven,
      tooltipText:
        "Current %age of price fall protection provided on collaterals",
    },
  ];

  return (
    <div className="flex  lg:h-auto flex-col lg:flex-row w-full items-start border-b border-solid border-grayLight gap-6 relative">
      <motion.div
        className="p-6 w-full pb-0 lg:pb-6"
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
      >
        <div className="flex lg:w-[75%]   flex-col lg:flex-row w-full">
          <SingleListItemImage src={item.tokenImage} stakedToken={item.token} />
          <div className="flex flex-grow flex-col md:flex-row w-full 2xl:max-w-full max-w-screen-md h-[120px] lg:h-[160px]">
            {metrics.map((metric, index) => (
              <div key={index} className="md:flex-1 h-full">
                <ListItemMetric {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Link prefetch={true} href={`/mintUSDaWithCollateral/${item.token}`}>
            <Button className="absolute rounded-none md:right-0 md:h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
              <Image src={arrow} width={42} height={42} alt="arrow" />
            </Button>
          </Link>
        </div>
      </motion.div>
      <Link
        className="w-full lg:hidden"
        prefetch={true}
        href={`/mintUSDaWithCollateral/${item.token}`}
      >
        <Button className="  rounded-none md:right-0 w-full h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
          <Image src={arrow} width={42} height={42} alt="arrow" />
        </Button>
      </Link>
    </div>
  );
}

export default SingleListItem;
