-- AlterTable
ALTER TABLE "products" ADD COLUMN     "age_id" INTEGER;

-- CreateTable
CREATE TABLE "age" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "age_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_age_id_fkey" FOREIGN KEY ("age_id") REFERENCES "age"("id") ON DELETE CASCADE ON UPDATE CASCADE;
