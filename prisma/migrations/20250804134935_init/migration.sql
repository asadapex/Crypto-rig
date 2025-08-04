/*
  Warnings:

  - You are about to drop the `MonthlyProdits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonthlyProdits" DROP CONSTRAINT "MonthlyProdits_userId_fkey";

-- DropTable
DROP TABLE "MonthlyProdits";

-- CreateTable
CREATE TABLE "MonthlyProfits" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MonthlyProfits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyProfits" ADD CONSTRAINT "MonthlyProfits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
