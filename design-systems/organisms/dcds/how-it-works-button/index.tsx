import { MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <motion.div
      onClick={handleClick}
      animate={{
        y: [0, 10, 0], // Up and down movement
      }}
      transition={{
        duration: 1, // Animation duration
        repeat: Infinity, // Repeat forever
        ease: "easeInOut", // Smooth easing
      }}
      className="text-[18px] xl:hidden  dark:bg-white bg-black rounded-full p-2 border border-solid border-grayLight absolute bottom-4 right-4 font-medium text-grayLight dark:text-white cursor-pointer"
    >
      <MessageCircleQuestion className="dark:text-black text-white" />
    </motion.div>
  );
}
