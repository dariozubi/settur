-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "tripType" TEXT NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "infants" INTEGER NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "arrivalFlight" TEXT NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "departureFlight" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "additionals" TEXT[],

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
