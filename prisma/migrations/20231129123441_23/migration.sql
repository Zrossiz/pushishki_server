/*
  Warnings:

  - You are about to drop the column `color` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product_variants` table. All the data in the column will be lost.
  - Added the required column `articul` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assembled_model_size` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `battery` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gearbox` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maximum_load` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_size_in_package` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "color",
DROP COLUMN "images",
DROP COLUMN "price",
ADD COLUMN     "articul" TEXT NOT NULL,
ADD COLUMN     "assembled_model_size" TEXT NOT NULL,
ADD COLUMN     "battery" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "gearbox" TEXT NOT NULL,
ADD COLUMN     "maximum_load" TEXT NOT NULL,
ADD COLUMN     "model_size_in_package" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;
