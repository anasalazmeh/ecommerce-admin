'use client'
import Heading from "@/components/ui/Heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
interface CategoriesClientProps{
  data:CategoryColumn[]
}
const CategoriesClient =  ({data}:CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="manage billboards for your store "
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data}/>
      <Heading title="API" description="API cails for Categories"/>
      <Separator/>
      <ApiList entityName="categories" entityIdName="CategoryId"/>
    </>
  );
};

export default CategoriesClient;
