-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "unitId" INTEGER;

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "vehicle" "Vehicle" NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_label_key" ON "Unit"("label");

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
