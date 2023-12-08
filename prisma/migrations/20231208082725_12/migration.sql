/*
  Warnings:

  - Made the column `order_id` on table `basket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "basket" DROP CONSTRAINT "basket_order_id_fkey";

-- AlterTable
ALTER TABLE "basket" ALTER COLUMN "order_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "basket" ADD CONSTRAINT "basket_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
