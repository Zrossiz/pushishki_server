/*
  Warnings:

  - Added the required column `title` to the `colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;
