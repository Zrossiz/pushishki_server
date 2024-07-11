/*
  Warnings:

  - Added the required column `slug` to the `sub_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_category" ADD COLUMN     "slug" TEXT NOT NULL;
