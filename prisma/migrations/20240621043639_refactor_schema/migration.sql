-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_targetId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_targetId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_authorId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_targetId_fkey";

-- DropForeignKey
ALTER TABLE "vibes" DROP CONSTRAINT "vibes_authorId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "banner" TEXT;

-- AddForeignKey
ALTER TABLE "vibes" ADD CONSTRAINT "vibes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "vibes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "vibes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
