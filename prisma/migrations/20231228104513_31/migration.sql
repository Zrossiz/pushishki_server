/*
  Warnings:

  - Changed the type of `maximum_load` on the `product_variants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "images" TEXT[],
DROP COLUMN "maximum_load",
ADD COLUMN     "maximum_load" INTEGER NOT NULL;
