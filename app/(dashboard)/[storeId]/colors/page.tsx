import prisma from "@/prisma/client";
import BillboardsClient from "./_components/clinet";
import { ColorColumn } from "./_components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const color = await prisma.color.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedColor: ColorColumn[] = color.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt.toDateString(),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedColor} />
      </div>
    </div>
  );
};

export default ColorsPage;
