import { getGraphRevenue } from "@/action/get-graph-revenue";
import { getSelectCount } from "@/action/get-select-count";
import { getStockCount } from "@/action/get-stock-count";
import { getTotalRevenue } from "@/action/get-total-revenue";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import prisma from "@/prisma/client";
import { CreditCard, DollarSign, Package } from "lucide-react";
import React from "react";
const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prisma.store.findUnique({
    where: { id: params.storeId },
  });
  const totalRevenue=await getTotalRevenue(params.storeId)
  const selectCount=await getSelectCount(params.storeId)
  const stockCount=await getStockCount(params.storeId)
  const graphRevenue=await getGraphRevenue(params.storeId)
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store"/>
        <Separator/>
        <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatter.format(totalRevenue)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{selectCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stockCount}
                </div>
              </CardContent>
            </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
