
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return NextResponse.json("Store id is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!store)
      return new NextResponse("store id is required", { status: 400 });
    const billboard = await prisma.billboards.findMany({
      where: {storeId: store.id },
    });
    if (!billboard)
      return new NextResponse("billboard id is required", { status: 400 });
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.error("[GIT billboard]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function POST(request: Request,{params}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const data = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!data) return new NextResponse("Name is required", { status: 400 });

    const store =await prisma.store.findFirst({
      where:{id:params.storeId,userId}
    })
    if(!store) return  new NextResponse("store id is required", { status: 400 });
    const billboard = await prisma.billboards.create({
      data:{
        label:data.label,
        storeId:store.id,
        imageUrl:data.imageUrl,
      }
    });
    return NextResponse.json(billboard)
  } catch (error) {
    console.error("[post billboard]",error)    
    return new NextResponse("Interal error", { status: 500 });
  }
}