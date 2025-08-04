/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `MonthlyProfits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonthlyProfits_userId_date_key" ON "MonthlyProfits"("userId", "date");
