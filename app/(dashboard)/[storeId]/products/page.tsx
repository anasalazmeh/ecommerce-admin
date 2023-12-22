import { formatter } from "@/lib/utils";
import prisma from "@/prisma/client";
import PorductsClient from "./_components/clinet";
import { ProductColumn } from "./_components/columns";

const ProductsPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findMany({
    where: { storeId: params.productId },
    include: {
      store: true,
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedproduct: ProductColumn[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    isArchive: item.isArchived,
    isFeatured: item.isFeatured,
    paice: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: item.createdAt.toDateString(),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PorductsClient data={formattedproduct} />
      </div>
    </div>
  );
};

export default ProductsPage;
