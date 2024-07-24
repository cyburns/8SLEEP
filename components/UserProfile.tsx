import React from "react";
import { useGetUsers } from "@/hooks/useGetUsers";
import Loader from "./ui/Loader";

interface UserProfileProps {
  userId: string;
}

const UserProfile = (userId: UserProfileProps) => {
  return <div>UserProfile</div>;
};

export default UserProfile;
