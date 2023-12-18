import prisma from "@/prisma/client";
import React from "react";
const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prisma.store.findUnique({
    where: { id: params.storeId },
  });
  return <div>Active store {store?.name}</div>;
};

export default DashboardPage;
