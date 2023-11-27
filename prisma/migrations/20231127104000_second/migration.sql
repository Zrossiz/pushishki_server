/*
  Warnings:

  - You are about to drop the column `Articul` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Product` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articul` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Articul",
DROP COLUMN "product_id",
ADD COLUMN     "articul" TEXT NOT NULL;
