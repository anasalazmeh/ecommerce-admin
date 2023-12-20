import prisma from "@/prisma/client";
import BillboardsClient from "./_components/clinet";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboards.findMany({
    where: { storeId: params.storeId },
  });
  const data=billboards.map(item=>({
    id:item.id,
    label:item.label,
    createdAt:item.createdAt.toDateString(),
  }))
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={data} />
      </div>
    </div>
  );
};

export default BillboardsPage;
