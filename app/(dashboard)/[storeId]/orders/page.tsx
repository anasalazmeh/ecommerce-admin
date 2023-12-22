import { formatter } from "@/lib/utils";
import prisma from "@/prisma/client";
import OrdersClient from "./_components/clinet";
import { OrderColumn } from "./_components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const order = await prisma.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const data: OrderColumn[] = order.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItem
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItem.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: item.createdAt.toDateString(),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={data} />
      </div>
    </div>
  );
};

export default OrdersPage;
