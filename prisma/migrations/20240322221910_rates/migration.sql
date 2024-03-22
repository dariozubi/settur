-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('SPRINTER', 'HIACE', 'SUBURBAN', 'ESCALADE', 'COACH', 'SHARED');

-- CreateEnum
CREATE TYPE "Trip" AS ENUM ('ROUND', 'ONEWAY');

-- CreateTable
CREATE TABLE "Rate" (
    "trip" "Trip" NOT NULL,
    "vehicle" "Vehicle" NOT NULL,
    "zone" "Zone" NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rate_trip_vehicle_zone_key" ON "Rate"("trip", "vehicle", "zone");
