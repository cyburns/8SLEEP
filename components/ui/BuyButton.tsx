import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BuyButtonProps {
  text: string;
  link: string;
}

const BuyButton = ({ text, link }: BuyButtonProps) => {
  const buyButtonRef = useRef(null);

  useEffect(() => {
    gsap.set(buyButtonRef.current, { opacity: 0, y: 20 });
  }, []);

  useEffect(() => {
    gsap.to(buyButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="flex justify-center mt-5 ">
      <button
        className="bg-white text-black py-4 px-7 rounded-md text-xl group relative overflow-hidden h-[3.9rem]"
        ref={buyButtonRef}
        style={{ opacity: 0 }}
      >
        <a
          className=" transition-transform duration-300 group-hover:-translate-y-[250%] flex"
          href={link}
        >
          {text}
        </a>

        <a
          className="transition-transform duration-300 translate-y-[150%] group-hover:translate-y-[-100%] flex"
          href={link}
        >
          {text}
        </a>
      </button>
    </div>
  );
};

export default BuyButton;
