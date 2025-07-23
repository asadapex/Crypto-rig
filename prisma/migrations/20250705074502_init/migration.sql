-- CreateEnum
CREATE TYPE "WithdrawType" AS ENUM ('TOPUP', 'WITHDRAW');

-- AlterTable
ALTER TABLE "Withdraw" ADD COLUMN     "type" "WithdrawType" NOT NULL DEFAULT 'WITHDRAW';
