/*
  Warnings:

  - You are about to drop the column `priceIds` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `AdditionalRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Rate_trip_vehicle_zone_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "priceIds";

-- AlterTable
ALTER TABLE "Rate" ADD COLUMN     "additionalId" "Additional",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "trip" DROP NOT NULL,
ALTER COLUMN "vehicle" DROP NOT NULL,
ALTER COLUMN "zone" DROP NOT NULL,
ALTER COLUMN "priceId" DROP DEFAULT,
ADD CONSTRAINT "Rate_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "AdditionalRate";

-- CreateTable
CREATE TABLE "_OrderToRate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToRate_AB_unique" ON "_OrderToRate"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToRate_B_index" ON "_OrderToRate"("B");

-- AddForeignKey
ALTER TABLE "_OrderToRate" ADD CONSTRAINT "_OrderToRate_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToRate" ADD CONSTRAINT "_OrderToRate_B_fkey" FOREIGN KEY ("B") REFERENCES "Rate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
