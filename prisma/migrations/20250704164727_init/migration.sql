-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('VISA', 'MASTERCARD', 'CRYPTO');

-- AlterTable
ALTER TABLE "Withdraw" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'VISA';
