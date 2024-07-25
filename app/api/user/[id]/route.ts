import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.error();
  }

  const INTERVALS_URL = `https://s3.amazonaws.com/eight-public/challenge/${id}.json`;

  try {
    const response = await fetch(INTERVALS_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch intervals for user ${id}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.error();
  }
};
