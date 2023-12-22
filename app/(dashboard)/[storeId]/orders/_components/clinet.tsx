"use client";
import Heading from "@/components/ui/Heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

const OrdersClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="manage orders for your store "
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default OrdersClient;
