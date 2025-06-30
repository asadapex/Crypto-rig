/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UserVideoCard` table. All the data in the column will be lost.
  - Added the required column `videoCardId` to the `UserVideoCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "UserVideoCard" DROP COLUMN "type",
ADD COLUMN     "videoCardId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserStatus";

-- DropEnum
DROP TYPE "VideoCardType";

-- CreateTable
CREATE TABLE "VideoCard" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "release" INTEGER NOT NULL,
    "algorithm" TEXT NOT NULL,
    "hashRate" TEXT NOT NULL,
    "powerEfficiency" TEXT NOT NULL,
    "powerUsage" TEXT NOT NULL,
    "supportedCoins" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "fans" INTEGER NOT NULL,
    "temperature" TEXT NOT NULL,
    "noiseLevel" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVideoCard" ADD CONSTRAINT "UserVideoCard_videoCardId_fkey" FOREIGN KEY ("videoCardId") REFERENCES "VideoCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
