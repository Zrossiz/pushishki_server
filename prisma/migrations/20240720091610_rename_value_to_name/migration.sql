/*
  Warnings:

  - You are about to drop the column `value` on the `age` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `drive` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `voltage` table. All the data in the column will be lost.
  - Added the required column `name` to the `age` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `drive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `voltage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "age" DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "drive" DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "voltage" DROP COLUMN "value",
ADD COLUMN     "name" INTEGER NOT NULL;
