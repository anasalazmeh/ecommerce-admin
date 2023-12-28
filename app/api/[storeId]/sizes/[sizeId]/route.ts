import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });

    if (!params.sizeId)
      return NextResponse.json("Category Id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const size = await prisma.size.findFirst({
      where: { id: params.sizeId, storeId: store.id },
    });
    if (!size)
      return new NextResponse("Category id is required", { status: 400 });
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.error("[GIT Size]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name, value } = body;

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!name)
      return NextResponse.json("name is required", { status: 400 });
    if (!value)
      return NextResponse.json("value is required", { status: 400 });
    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });
    if (!params.sizeId)
      return NextResponse.json("size Id is required", { status: 400 });

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!store) return NextResponse.json("Store is required", { status: 400 });
    const size = await prisma.size.update({
      where: {
        id: params.sizeId,
        storeId: store.id,
      },
      data: {
        name,
        value
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.error("[size UPDATE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("store Id is required", { status: 400 });

    if (!params.sizeId)
      return NextResponse.json("category Id is required", { status: 400 });

    const size = await prisma.size.delete({
      where: {
        storeId: params.storeId,
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.error("[size DELETE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
