import prisma from "@/prisma/client";
import BillboardsClient from "./_components/clinet";
import { SizeColumn } from "./_components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt.toDateString(),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedSize} />
      </div>
    </div>
  );
};

export default SizesPage;
