-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'OFFLINE');

-- AlterTable
ALTER TABLE "UserVideoCard" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
