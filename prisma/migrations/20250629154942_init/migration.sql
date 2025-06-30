/*
  Warnings:

  - Changed the type of `hashRate` on the `VideoCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VideoCard" DROP COLUMN "hashRate",
ADD COLUMN     "hashRate" DOUBLE PRECISION NOT NULL;
