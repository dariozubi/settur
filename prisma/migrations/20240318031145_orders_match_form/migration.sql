/*
  Warnings:

  - You are about to drop the column `additionals` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `arrival` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "additionals",
DROP COLUMN "arrival",
DROP COLUMN "departure",
ADD COLUMN     "arrivalDate" TIMESTAMP(3),
ADD COLUMN     "departureDate" TIMESTAMP(3),
ADD COLUMN     "items" TEXT[],
ALTER COLUMN "arrivalFlight" DROP NOT NULL,
ALTER COLUMN "departureFlight" DROP NOT NULL;
