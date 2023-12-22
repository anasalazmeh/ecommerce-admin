import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return NextResponse.json("Billboard id is required", { status: 400 });

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

    const {
      name,
      images,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
    } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!price) return new NextResponse("Price is required", { status: 400 });

    if (!categoryId)
      return new NextResponse("Category Id is required", { status: 400 });

    if (!sizeId)
      return new NextResponse("Size Id is required", { status: 400 });

    if (!colorId)
      return new NextResponse("Color Id is required", { status: 400 });

    if (!images || !images.length)
      return new NextResponse("Images is required", { status: 400 });

    if (!params.productId)
      return NextResponse.json("Billboard id is required", { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

    if (!params.productId)
      return NextResponse.json("Product id is required", { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return NextResponse.json("Interal error", { status: 500 });
  }
}
