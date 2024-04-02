/*
  Warnings:

  - You are about to drop the column `vehicle` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `vehicle` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "vehicle" "Vehicle" NOT NULL;

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "vehicle";
