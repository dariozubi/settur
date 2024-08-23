/*
  Warnings:

  - You are about to drop the column `priceId` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Rate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rate" DROP COLUMN "priceId",
DROP COLUMN "stripeId",
ADD COLUMN     "productId" TEXT NOT NULL DEFAULT '-';
