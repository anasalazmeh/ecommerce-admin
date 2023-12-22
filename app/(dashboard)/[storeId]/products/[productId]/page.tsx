import prisma from "@/prisma/client";
import ProductForm from "./_Components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
    },
  });
  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
  });
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          colors={colors}
          categories={categories}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
