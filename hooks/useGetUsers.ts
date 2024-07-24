"use client";

import { useState, useEffect } from "react";
import { UserData } from "@/lib/types";

export const useGetUsers = (userId?: string) => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserById = async (userId: string) => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data for user ID: ${userId}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const getAllUsers = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      if (userId) {
        const user = data.users.find((user: UserData) => user.id === userId);
        const userDetails = await fetchUserById(user.id);

        setUserData([{ ...user, details: userDetails }]);
      } else {
        const usersWithDetails = await Promise.all(
          data.users.map(async (user: UserData) => {
            const userDetails = await fetchUserById(user.id);
            return { ...user, details: userDetails };
          })
        );

        setUserData(usersWithDetails);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return { userData, isLoading };
};
