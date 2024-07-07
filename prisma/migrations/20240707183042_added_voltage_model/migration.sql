-- AlterTable
ALTER TABLE "products" ADD COLUMN     "voltage_id" INTEGER;

-- CreateTable
CREATE TABLE "voltage" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "voltage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_voltage_id_fkey" FOREIGN KEY ("voltage_id") REFERENCES "voltage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
