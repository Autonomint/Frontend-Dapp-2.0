import { Button } from "@/design-systems/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/design-systems/atoms/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Spinner from "../Spinner";

type DropdownItem = {
  label: string | React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type DropdownMenuProps = {
  buttonText: string;
  items: DropdownItem[];
  className?: string;
  icon?: React.ReactNode;
  iconWrapBg?: string;
  isLoading?: boolean;
  contentWrapClass?: string;
};

export function GenericDropdownMenu({
  buttonText,
  items,
  className = "",
  icon = <ChevronDownIcon className="w-4 h-4" />,
  iconWrapBg,
  isLoading = false,
  contentWrapClass,
}: DropdownMenuProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<string | undefined>();

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(`${buttonRef.current.offsetWidth}px`);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          className={`flex items-center justify-between relative h-[50px] ${className}`}
        >
          <span className="flex-1 flex gap-2 items-center justify-start  text-left overflow-hidden">
            {buttonText}

            {isLoading && <Spinner />}
          </span>
          <div
            className={`h-full w-[50px]  bg-transparent flex justify-center items-center border-l border-[1px] border-grayLight border-y-0 border-r-0 absolute right-0 ${iconWrapBg}`}
          >
            {icon}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`bg-white dark:bg-black border p-3  border-grayLight  shadow-md ${contentWrapClass}`}
        style={{ width: dropdownWidth }}
        align="start"
      >
        {items.map((item, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuItem
              onClick={item.onClick}
              disabled={item.disabled}
              className={` text-[18px]  ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              {item.label}

              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            {index < items.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
