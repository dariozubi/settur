/*
  Warnings:

  - You are about to drop the column `prices` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "prices",
ADD COLUMN     "products" TEXT[];
