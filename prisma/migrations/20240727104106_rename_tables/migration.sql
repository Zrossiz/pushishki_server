/*
  Warnings:

  - You are about to drop the `age` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voltage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_age_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_drive_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_voltage_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_category" DROP CONSTRAINT "sub_category_category_id_fkey";

-- DropTable
DROP TABLE "age";

-- DropTable
DROP TABLE "drive";

-- DropTable
DROP TABLE "sub_category";

-- DropTable
DROP TABLE "voltage";

-- CreateTable
CREATE TABLE "voltages" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,

    CONSTRAINT "voltages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drives" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "drives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_voltage_id_fkey" FOREIGN KEY ("voltage_id") REFERENCES "voltages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_age_id_fkey" FOREIGN KEY ("age_id") REFERENCES "ages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_drive_id_fkey" FOREIGN KEY ("drive_id") REFERENCES "drives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
