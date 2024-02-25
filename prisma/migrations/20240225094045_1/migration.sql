-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_key_words" TEXT,
ADD COLUMN     "meta_tile" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_key_words" TEXT,
ADD COLUMN     "meta_tile" TEXT;
