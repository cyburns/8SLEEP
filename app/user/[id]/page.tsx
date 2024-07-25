"use client";

import UserProfile from "@/components/UserProfile";
import React, { useEffect } from "react";
import { useGetUsers } from "@/hooks/useGetUsers";
import Loader from "@/components/ui/Loader";

interface PageProps {
  params: {
    id: string;
  };
}

const UserPage = ({ params }: PageProps) => {
  const { id } = params;
  const { userData, isLoading } = useGetUsers(id);

  if (isLoading || !userData) return <Loader />;

  return (
    <div>
      <UserProfile userData={userData} />
    </div>
  );
};

export default UserPage;
