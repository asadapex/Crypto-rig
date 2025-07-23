-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "verified" INTEGER NOT NULL DEFAULT 0;
