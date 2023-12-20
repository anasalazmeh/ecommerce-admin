import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;

    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });

    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!params.storeId)
      return NextResponse.json("Store is required", { status: 400 });

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE UPDATE]: ",error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return NextResponse.json("Store is required", { status: 400 });
    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE DELETE]: ",error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
