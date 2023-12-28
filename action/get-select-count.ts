import prisma from "@/prisma/client";

export const getSelectCount = async (storeId: string) => {
  const selectCount = await prisma.order.count({
    where: {
      storeId: storeId,
      isPaid: true,
    },
  });


  return selectCount
};
