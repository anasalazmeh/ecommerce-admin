import prisma from "@/prisma/client";
import BillboardsClient from "./_components/clinet";
import { CategoryColumn } from "./_components/columns";

const CategoiesPage = async ({ params }: { params: { categoryId: string } }) => {
  const categoies = await prisma.category.findMany({
    where: { storeId: params.categoryId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategoty: CategoryColumn[] = categoies.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel:item.billboard.label,
    createdAt: item.createdAt.toDateString(),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedCategoty} />
      </div>
    </div>
  );
};

export default CategoiesPage;
