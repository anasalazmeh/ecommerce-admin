import prisma from "@/prisma/client";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
  const TotalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItem.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    },0);
    return total + orderTotal;
  }, 0);

  return TotalRevenue
};
