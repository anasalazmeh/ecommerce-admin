
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store)
  } catch (error) {
    return new NextResponse("Interal error", { status: 500 });
  }
}