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
    const category = await prisma.category.findMany({
      where: {storeId: store.id },
    });
    if (!category)
      {
        return new NextResponse("Category id is required", { status: 400 });
      }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("[GIT Category]", error);
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

    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const category = await prisma.category.create({
      data: {
        name,
        storeId: store.id,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("[post category]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
