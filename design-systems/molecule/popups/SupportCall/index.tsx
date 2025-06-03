"use client";
import { useState } from "react";
import buttonImage from "@/app/assets/Jerry kid 2.jpg";
import Image from "next/image";

const SupportCall = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <a
      href="https://meet.brevo.com/akshit-vig"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-2 w-[50px] h-[50px] hover:scale-110 transition-all rounded-full border-white  border-2 overflow-hidden right-2"
    >
      <Image layout="fill" src={buttonImage} alt="Call" />
    </a>
  );
};

export default SupportCall;
