import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GIT(
  request: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
    return NextResponse.json("Store id is required", { status: 400 });
  
    if (!params.billboardId)
    return NextResponse.json("billboard Id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const billboard = await prisma.billboards.findFirst({
      where: { id: params.billboardId,storeId:store.id },
    });
    if (!billboard)
      return new NextResponse("bilboard id is required", { status: 400 });
    return;
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.error("[GIT billboard]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!body.label)
      return NextResponse.json("label is required", { status: 400 });
    if (!body.imageUrl)
      return NextResponse.json("imageUrl is required", { status: 400 });
    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });
    if (!params.billboardId)
      return NextResponse.json("billboard Id is required", { status: 400 });

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!store) return NextResponse.json("Store is required", { status: 400 });
    const bilboardNew = await prisma.billboards.update({
      where: {
        id: params.billboardId,
        storeId: store.id,
      },
      data: {
        label: body.label,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(bilboardNew);
  } catch (error) {
    console.error("[bilboard UPDATE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("store Id is required", { status: 400 });

    if (!params.billboardId)
      return NextResponse.json("billboard Id is required", { status: 400 });

    const store = await prisma.billboards.delete({
      where: {
        storeId: params.storeId,
        id: params.billboardId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error("[billboard DELETE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
