-- AlterTable
ALTER TABLE "products" ADD COLUMN     "drive_id" INTEGER;

-- CreateTable
CREATE TABLE "drive" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "drive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_drive_id_fkey" FOREIGN KEY ("drive_id") REFERENCES "drive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
