"use client";
import { useInviteCodePopup } from "@/contexts/InviteCodePopup";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { Input } from "@/design-systems/atoms/input";
import { Typography } from "@/design-systems/atoms/Typography";
import { useInviteCodeMutation } from "@/hookes/api-hooks/useInvite";
import { NetworkId } from "@/utils/constants";
import { useAppKit } from "@reown/appkit/react";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
interface InviteCodePopup {}

const InviteCodePopup = ({}: InviteCodePopup) => {
  // invite code popup is a component that allows the user to enter an invite code
  const { isInviteCodePopupOpen, setIsInviteCodePopupOpen } =
    useInviteCodePopup();
  // useAppKit is a hook that allows the user to connect to the appkit
  const { open, close } = useAppKit();
  // useAccount is a hook that allows the user to connect to the account
  const { address, isConnected, chainId } = useAccount();
  // inputError is a state that allows the user to enter an invite code
  const [inputError, setInputError] = useState("");
  // isMounted is a state that allows the user to mount the component
  const [isMounted, setIsMounted] = useState(false);
  // disconnect is a hook that allows the user to disconnect from the account
  const { disconnect } = useDisconnect();
  // router is a hook that allows the user to navigate to the invited page
  const router = useRouter();

  // otp is a state that allows the user to enter an invite code
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  // inputsRef is a ref that allows the user to focus on the input field
  const inputsRef = useRef<HTMLInputElement[]>([]);
  // assignInviteCodeAsync is a hook that allows the user to assign an invite code
  const {
    assignInviteCodeAsync,
    assignInviteCodeError,
    assignInviteCodeResponse,
  } = useInviteCodeMutation(() => {
    setInputError("Please enter a valid invite code");
  });
  // pathname is a hook that allows the user to navigate to the invited page
  const pathname = usePathname();
  // handleChange is a function that allows the user to change the invite code
  const handleChange = (value: string, index: number) => {
    // if (!/^\d$/.test(value) && value !== "") return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handleBackspace is a function that allows the user to backspace the invite code
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    // handleAutoInviteCodeLogin is a function that allows the user to auto login the invite code
    handleAutoInviteCodeLogin();
  }, [address, isConnected]);

  // handleAutoInviteCodeLogin is a function that allows the user to auto login the invite code
  const handleAutoInviteCodeLogin = async () => {
    const inviteCode = localStorage.getItem("inviteCode");
    // if the invite code is not connected and the user is connected, then the user can auto login the invite code
    if (inviteCode && isConnected) {
      if (address) {
        const res = await assignInviteCodeAsync({
          address,
          inviteCode: inviteCode,
        });

        // if the invite code is assigned, then the user can auto login the invite code
        if (!!res) {
          setIsInviteCodePopupOpen(false);
          localStorage.setItem("verified", "true");
          localStorage.setItem("AddressForInviteCode", address);
          localStorage.setItem("inviteCode", otp.join(""));
        } else {
          // if the invite code is not assigned, then the user can remove the invite code
          localStorage.setItem("verified", "false");
          localStorage.removeItem("AddressForInviteCode");
        }
      }
    }
  };

  const handleSubmit = async () => {
    setInputError("");
    // if the invite code is not connected, then the user can connect the wallet
    try {
      if (!isConnected) return open();
      // if the invite code is not valid, then the user can enter a valid invite code
      if (otp.join("").length < 6) {
        setInputError("Please enter a valid invite code");
        return;
      } else {
        // if the invite code is valid, then the user can assign the invite code
        setInputError("");
      }
      if (address) {
        // if the address is not valid, then the user can enter a valid address
        const res = await assignInviteCodeAsync({
          address,
          inviteCode: otp.join(""),
        });

        if (!!res) {
          // if the invite code is assigned, then the user can auto login the invite code
          setIsInviteCodePopupOpen(false);
          localStorage.setItem("verified", "true");
          localStorage.setItem("inviteCode", otp.join(""));
          localStorage.setItem("AddressForInviteCode", address);
          setOtp(Array(6).fill(""));
          const isVisited = localStorage.getItem("invited-page-visited");
          if (!isVisited) {
            router.push("/invited");
          }
        } else {
          // if the invite code is not assigned, then the user can disconnect the wallet
          disconnect();
          localStorage.setItem("verified", "false");
          setInputError("Please enter a valid invite code");
        }
      }
    } catch (error) {
      // if the invite code is not valid, then the user can enter a valid invite code
      disconnect();
      localStorage.setItem("verified", "false");
      // setIsInviteCodePopupOpen(false);
      setInputError("Please enter a valid invite code");
    }
  };

  if (isMounted) {
    // if the invite code popup is open, then the user can close the popup
    const closeElement =
      window.document.querySelector<HTMLElement>(".popup-close-icon");

    if (closeElement && isInviteCodePopupOpen) {
      // Hide the element (using `display` or `visibility`)
      closeElement.style.display = "none";
    } else if (closeElement) {
      // if the invite code popup is not open, then the user can show the popup
      closeElement.style.display = "block";
    }
  }

  useEffect(() => {
    // if the invite code popup is mounted, then the user can set the isMounted to true
    setIsMounted(true);
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    const pasteOtp = pasteData.slice(0, 6).split(""); // Take only first 6 characters and split them into an array

    // Ensure only digits are pasted
    const newOtp = [...otp];

    // Loop through the pasted OTP and fill the inputs
    pasteOtp.forEach((char, idx) => {
      newOtp[idx] = char;
    });

    setOtp(newOtp);

    // Focus on the last filled input field
    const nextInputIndex = pasteOtp.length < 6 ? pasteOtp.length : 5;
    inputsRef.current[nextInputIndex].focus();
  };

  return (
    <Dialog
      open={isInviteCodePopupOpen}
      //   onOpenChange={setIsInviteCodePopupOpen}
    >
      <DialogContent
        hidden={true}
        title="Terms & Privacy Policy"
        className="invite_code_popup_container dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0"
      >
        <div>
          <Typography size="h4" className="">
            Invite Code
          </Typography>

          <h4 className="font-normal mt-12 text-base  text-black dark:text-[#FFFFFF99] font-space-grotesk">
            Already got the invite code? Enter the Invite Code here.
          </h4>
          <div className="flex   flex-wrap xl:flex-nowrap justify-center mt-2 gap-2 items-center xl:justify-start flex-col">
            <div className="h-full flex-row flex justify-between">
              {otp.map((value, index) => (
                <Input
                  className="rounded-none md:text-subtitle placeholder:text-subtitle h-12 px-4 w-[15%]"
                  key={index}
                  type="text"
                  onPaste={handlePaste}
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  ref={(el) => {
                    if (el) {
                      inputsRef.current[index] = el;
                    }
                  }}
                  placeholder="-"
                />
              ))}
            </div>
            <div className="w-full">
              <Typography
                size="sm"
                variant="regular"
                className="text-red-500 text-left"
              >
                {inputError}
              </Typography>
            </div>

            <Button
              disabled={isConnected && otp.join("").length < 6}
              onClick={handleSubmit}
              className="bg-black mt-8 w-full  font-space-grotesk font-normal  border-[#FFFFFF99] flex gap-2  h-[55px] hover:bg-black hover:text-white   py-6 md:p-8   text-[18px] md:text-[20px] "
            >
              {isConnected ? " Submit Invite Code" : "Connect Wallet"}
              <ArrowRight
                className="stroke-white
"
              />
            </Button>

            <a
              className="text-base my-2 font-normal text-black dark:text-[#FFFFFF99] underline-offset-1 underline "
              href="https://docs.google.com/forms/d/e/1FAIpQLSfBhDW1fvKykmJgGIozMwPvFX5COWC7RObog0WAU-cEmVWLIw/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Don't have an invite code?
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCodePopup;
