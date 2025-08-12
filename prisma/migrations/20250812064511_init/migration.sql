/*
  Warnings:

  - You are about to drop the column `count` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `videoCardId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_videoCardId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "count",
DROP COLUMN "videoCardId",
ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'system';

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "videoCardId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_videoCardId_fkey" FOREIGN KEY ("videoCardId") REFERENCES "VideoCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
