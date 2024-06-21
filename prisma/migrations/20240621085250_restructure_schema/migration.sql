-- AlterTable
ALTER TABLE "users" ADD COLUMN     "filterContent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "vibes" ADD COLUMN     "badLabels" TEXT[];
