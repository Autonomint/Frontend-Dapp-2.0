import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollDownArrow = ({
  classNames,
  handleClick,
}: {
  classNames?: string;
  handleClick?: () => void;
}) => {
  return (
    <motion.div
      onClick={handleClick}
      className={`absolute cursor-pointer inset-x-0 top-0 flex justify-center ${classNames}`}
      animate={{
        y: [0, 10, 0], // Up and down movement
      }}
      transition={{
        duration: 1, // Animation duration
        repeat: Infinity, // Repeat forever
        ease: "easeInOut", // Smooth easing
      }}
    >
      <ChevronDown className="w-10 h-10 dark:text-white text-textBlack" />
    </motion.div>
  );
};

export default ScrollDownArrow;
