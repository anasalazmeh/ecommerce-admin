import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });

    if (!params.colorId)
      return NextResponse.json("color Id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const color = await prisma.color.findFirst({
      where: { id: params.colorId, storeId: store.id },
    });
    if (!color)
      return new NextResponse("color id is required", { status: 400 });
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.error("[GIT Color]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { colorId: string; storeId: string } }
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
    if (!params.colorId)
      return NextResponse.json("color Id is required", { status: 400 });

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!store) return NextResponse.json("Store is required", { status: 400 });
    const color = await prisma.color.update({
      where: {
        id: params.colorId,
        storeId: store.id,
      },
      data: {
        name,
        value
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.error("[color UPDATE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("store Id is required", { status: 400 });

    if (!params.colorId)
      return NextResponse.json("color Id is required", { status: 400 });

    const color = await prisma.color.delete({
      where: {
        storeId: params.storeId,
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.error("[color DELETE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
