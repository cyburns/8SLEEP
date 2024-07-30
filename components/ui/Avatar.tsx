import React from "react";

interface AvatarProps {
  name: string;
}

const Avatar = ({ name }: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-[#8e8d92] rounded-full w-12 h-12 flex justify-center items-center">
      <p className="text-lg">{initials}</p>
    </div>
  );
};

export default Avatar;
