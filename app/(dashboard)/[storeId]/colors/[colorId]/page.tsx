import prisma from "@/prisma/client";
import ColorForm from "./_Components/ColorForm";

const ColorPage = async ({
  params,
}: {
  params: { colorId: string; storeId: string };
}) => {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
