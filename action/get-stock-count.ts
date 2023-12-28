import prisma from "@/prisma/client";

export const getStockCount = async (storeId: string) => {
  const StockCount = await prisma.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });


  return StockCount
};
