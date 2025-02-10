import { RingLoadingIcon } from "@/components/ui/SvgIcons";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <RingLoadingIcon
        width={80}
        height={80}
        className="fill-black dark:fill-white w-8 h-8 "
      />
    </div>
  );
};

export default PageLoader;
