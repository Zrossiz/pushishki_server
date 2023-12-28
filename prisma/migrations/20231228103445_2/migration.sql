/*
  Warnings:

  - Changed the type of `maximum_load` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "maximum_load",
ADD COLUMN     "maximum_load" INTEGER NOT NULL,
ALTER COLUMN "assembled_model_size" SET DATA TYPE TEXT;
