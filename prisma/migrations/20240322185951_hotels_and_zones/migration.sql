/*
  Warnings:

  - You are about to drop the column `arrivalDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalFlight` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `departureDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `departureFlight` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('ZONE1', 'ZONE2', 'ZONE3', 'ZONE4', 'ZONE5', 'ZONE6', 'ZONE7', 'ZONE8', 'ZONE9');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "arrivalDate",
DROP COLUMN "arrivalFlight",
DROP COLUMN "departureDate",
DROP COLUMN "departureFlight",
DROP COLUMN "type",
DROP COLUMN "vehicle",
DROP COLUMN "vehicleType";

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zone" "Zone" NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);
