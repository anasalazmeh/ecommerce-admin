import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });

    if (!params.categoryId)
      return NextResponse.json("Category Id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const category = await prisma.category.findFirst({
      where: { id: params.categoryId, storeId: store.id },
      include:{
        billboard:true
      }
    });
    if (!category)
      return new NextResponse("Category id is required", { status: 400 });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("[GIT Category]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    const body = await request.json();
    const { name, billboardId } = body;

    if (!name) return NextResponse.json("name is required", { status: 400 });
    if (!billboardId)
      return NextResponse.json("billboardId is required", { status: 400 });
    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });
    if (!params.categoryId)
      return NextResponse.json("category Id is required", { status: 400 });

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!store) return NextResponse.json("Store is required", { status: 400 });
    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
        storeId: store.id,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("[category UPDATE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("store Id is required", { status: 400 });
    const store = await prisma.store.findFirst({
      where: { id: params.storeId },
    });
    if(!store)
       return NextResponse.json("Store is required", { status: 400 });
      
    if (!params.categoryId)
      return NextResponse.json("category Id is required", { status: 400 });

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
        storeId: store?.id,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("[category DELETE]: ", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
