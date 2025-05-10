import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";

/**
 * PageLoader is a component that displays a loading spinner.
 * It is used to indicate that a page is loading.
 * It is used in the PageLoader component.
 * 
 * 
 */
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
