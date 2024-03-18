/*
  Warnings:

  - You are about to drop the column `tripType` on the `Order` table. All the data in the column will be lost.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tripType",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vehicleType" TEXT NOT NULL;
