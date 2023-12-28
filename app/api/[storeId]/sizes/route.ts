import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const size = await prisma.size.findMany({
      where: {storeId: store.id },
    });
    if (!size)
      return new NextResponse("Size id is required", { status: 400 });
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.error("[GIT size]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const size = await prisma.size.create({
      data: {
        name,
        storeId: params.storeId,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.error("[post size]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
