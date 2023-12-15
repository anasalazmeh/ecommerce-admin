import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
const SetupLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const store = await prisma.store.findFirst({
    where: { userId },
  });
  if (store) redirect(`/${store.id}`);
  return <div>{children }</div>;
};

export default SetupLayout;
