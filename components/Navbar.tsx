import React from "react";
import Image from "next/image";
import EightSleepLogo from "@/public/Eight_Sleep_logo.png";

const Navbar = () => {
  return (
    <div className="mx-5 sm:mx-10 md:mx-16 my-4 flex flex-row justify-between">
      <Image src={EightSleepLogo} alt="Eight Sleep" width={70} height={1000} />
      <div className="flex flex-col justify-center items-center space-y-2">
        <span className="w-8 h-[0.15rem] bg-white rounded-lg" />
        <span className="w-8 h-[0.15rem] bg-white rounded-lg" />
      </div>
    </div>
  );
};

export default Navbar;
