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
    <div className="flex justify-center mt-5">
      <button
        className="bg-white text-black py-4 px-7 rounded-md text-xl group"
        ref={buyButtonRef}
        style={{ opacity: 0 }}
      >
        <a className="group-hover:translate-x-[100%]" href={link}>
          {text}
        </a>
      </button>
    </div>
  );
};

export default BuyButton;
