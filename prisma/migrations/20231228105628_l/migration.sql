/*
  Warnings:

  - You are about to drop the column `brand_name` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `category_slug` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `country_name` on the `product_variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "brand_name",
DROP COLUMN "category_slug",
DROP COLUMN "country_name";
