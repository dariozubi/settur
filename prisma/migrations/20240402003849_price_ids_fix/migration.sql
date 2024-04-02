/*
  Warnings:

  - You are about to drop the `_OrderToRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToRate" DROP CONSTRAINT "_OrderToRate_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToRate" DROP CONSTRAINT "_OrderToRate_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "priceIds" TEXT[];

-- DropTable
DROP TABLE "_OrderToRate";
