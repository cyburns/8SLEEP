import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  //@ts-ignore
  const id = req.nextUrl.pathname.split("/").pop();

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
