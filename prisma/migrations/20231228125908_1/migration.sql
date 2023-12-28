/*
  Warnings:

  - Added the required column `product_variant_id` to the `products_colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_colors" ADD COLUMN     "product_variant_id" INTEGER NOT NULL;
