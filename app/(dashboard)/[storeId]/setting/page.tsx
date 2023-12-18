import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingForm from "./_components/SettingForm";

const SettingPage = async ({ params }: { params: { storeId: string } }) => {
  const user = auth();
  if (!user.userId) redirect("/sign-in");
  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId: user.userId },
  });
  if (!store) redirect("/");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};
export default SettingPage;
