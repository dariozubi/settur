/*
  Warnings:

  - Added the required column `trip` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('AIRPORT', 'HOTEL');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "trip" "Trip" NOT NULL;

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "direction" "Direction" NOT NULL;
