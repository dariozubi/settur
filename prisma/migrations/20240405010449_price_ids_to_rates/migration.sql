/*
  Warnings:

  - You are about to drop the column `priceIds` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "priceIds",
ADD COLUMN     "rates" TEXT[];
