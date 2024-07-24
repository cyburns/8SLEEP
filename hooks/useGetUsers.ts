"use client";

import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDataById = async (userId: string) => {
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
      const usersWithDetails = await Promise.all(
        data.users.map(async (user: User) => {
          const userDetails = await fetchUserDataById(user.id);
          return { ...user, details: userDetails };
        })
      );

      setUsers(usersWithDetails);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return { users, isLoading };
};
