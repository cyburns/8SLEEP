import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await fetch(
      "https://s3.amazonaws.com/eight-public/challenge/users.json"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.error();
  }
};
