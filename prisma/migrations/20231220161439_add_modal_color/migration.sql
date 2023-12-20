-- CreateTable
CREATE TABLE "Color" (
    "id" STRING NOT NULL,
    "storeId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "value" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Color_storeId_idx" ON "Color"("storeId");
