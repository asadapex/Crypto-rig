-- CreateEnum
CREATE TYPE "WithdrawStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'ONREVIEW');

-- CreateTable
CREATE TABLE "Withdraw" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "WithdrawStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Withdraw_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Withdraw" ADD CONSTRAINT "Withdraw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
