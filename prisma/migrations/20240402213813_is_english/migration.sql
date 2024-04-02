/*
  Warnings:

  - Added the required column `isEnglish` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isEnglish" BOOLEAN NOT NULL;
