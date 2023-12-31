'use client'
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/client";
import { Billboards } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";
interface BillboardsClientProps{
  data:BillboardColumn[]
}
const BillboardsClient =  ({data}:BillboardsClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="manage billboards for your store "
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data}/>
      <Heading title="API" description="API cails for Billboard"/>
      <Separator/>
      <ApiList entityName="biilboards" entityIdName="biilboardId"/>
    </>
  );
};

export default BillboardsClient;
