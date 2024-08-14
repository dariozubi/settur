/*
  Warnings:

  - You are about to drop the column `isReserve` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rates` on the `Order` table. All the data in the column will be lost.
  - Added the required column `owed` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isReserve",
DROP COLUMN "rates",
ADD COLUMN     "owed" INTEGER NOT NULL,
ADD COLUMN     "prices" TEXT[];
