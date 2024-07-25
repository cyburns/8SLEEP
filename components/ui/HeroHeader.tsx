import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroHeaderProps {
  familyLastName: string;
}

const HeroHeader = ({ familyLastName }: HeroHeaderProps) => {
  const headerTextRef = useRef(null);

  useEffect(() => {
    gsap.set(headerTextRef.current, { opacity: 0, y: 20 });
  }, []);

  useEffect(() => {
    gsap.to(headerTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="w-full flex justify-center mt-16">
      <h1
        ref={headerTextRef}
        className="text-[4rem] font-normal text-center !leading-[1] overflow-hidden"
        style={{ opacity: 0 }}
      >
        Welcome back,{" "}
        <span className="main-text-gradient">{familyLastName} </span>family
      </h1>
    </div>
  );
};

export default HeroHeader;
