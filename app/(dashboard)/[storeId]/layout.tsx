import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  params: { storeId: string };
}
const DashboardLayout = async ({ children, params }: Props) => {
  const user = auth();
  if (!user.userId) redirect("/sign-in");
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId: user.userId,
    },
  });
  if (!store) redirect("/");
  return <>
  <div>the Anas Alazmeh Navber</div>
  {children}
  </>;
};

export default DashboardLayout;
