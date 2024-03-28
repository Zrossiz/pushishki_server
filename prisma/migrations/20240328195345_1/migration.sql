/*
  Warnings:

  - You are about to drop the column `variant_id` on the `basket` table. All the data in the column will be lost.
  - Added the required column `color` to the `basket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "basket" DROP CONSTRAINT "basket_variant_id_fkey";

-- AlterTable
ALTER TABLE "basket" DROP COLUMN "variant_id",
ADD COLUMN     "color" TEXT NOT NULL;
