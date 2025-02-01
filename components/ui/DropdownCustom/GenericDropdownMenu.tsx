import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type DropdownItem = {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type DropdownMenuProps = {
  buttonText: string;
  items: DropdownItem[];
  className?: string;
  icon?: React.ReactNode;
};

export function GenericDropdownMenu({
  buttonText,
  items,
  className = "",
  icon = <ChevronDownIcon className="w-4 h-4" />,
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
          <span className="flex-1 text-left">{buttonText}</span>
          <span className="h-full w-px bg-grayLight mx-2 absolute right-12" />
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`bg-white dark:bg-black border p-3 border-grayLight dark:border-gray-700 shadow-md`}
        style={{ width: dropdownWidth }}
        align="start"
      >
        {items.map((item, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuItem
              onClick={item.onClick}
              disabled={item.disabled}
              className={` text-[18px] ${
                item.disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
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
