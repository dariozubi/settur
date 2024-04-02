/*
  Warnings:

  - The values [ZONE9] on the enum `Zone` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `created` on the `Order` table. All the data in the column will be lost.
  - The `items` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Additional" AS ENUM ('WHEELCHAIR', 'CARSEAT', 'BOOSTERSEAT', 'SHOPPING', 'PETBOX', 'KAYAK', 'BICYCLE', 'SURFTABLE', 'RESERVATION');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'RESERVED', 'PAID', 'CANCELLED', 'FULFILLED');

-- AlterEnum
BEGIN;
CREATE TYPE "Zone_new" AS ENUM ('ZONE1', 'ZONE2', 'ZONE3', 'ZONE4', 'ZONE5', 'ZONE6', 'ZONE7', 'ZONE8');
ALTER TABLE "Hotel" ALTER COLUMN "zone" TYPE "Zone_new" USING ("zone"::text::"Zone_new");
ALTER TABLE "Rate" ALTER COLUMN "zone" TYPE "Zone_new" USING ("zone"::text::"Zone_new");
ALTER TYPE "Zone" RENAME TO "Zone_old";
ALTER TYPE "Zone_new" RENAME TO "Zone";
DROP TYPE "Zone_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "priceIds" TEXT[],
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'CREATED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "items",
ADD COLUMN     "items" "Additional"[];

-- AlterTable
ALTER TABLE "Rate" ADD COLUMN     "priceId" TEXT NOT NULL DEFAULT 'price_1OzRgsFMaNpUdK6VX2Es3Kji';

-- CreateTable
CREATE TABLE "AdditionalRate" (
    "id" "Additional" NOT NULL,
    "value" INTEGER NOT NULL,
    "priceId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalRate_id_key" ON "AdditionalRate"("id");
