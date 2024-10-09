/*
  Warnings:

  - You are about to drop the column `meta_tile` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `meta_tile` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `meta_tile` on the `sub_categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "meta_tile",
ADD COLUMN     "meta_title" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "meta_tile",
DROP COLUMN "sub_category_id",
ADD COLUMN     "meta_title" TEXT;

-- AlterTable
ALTER TABLE "sub_categories" DROP COLUMN "meta_tile",
ADD COLUMN     "meta_title" TEXT;

-- CreateTable
CREATE TABLE "sub_category_products" (
    "id" SERIAL NOT NULL,
    "sub_category_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "sub_category_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_category_products" ADD CONSTRAINT "sub_category_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category_products" ADD CONSTRAINT "sub_category_products_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
