-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderType" "OrderType";
