/*
  Warnings:

  - You are about to drop the column `followerId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `follows` table. All the data in the column will be lost.
  - Added the required column `followTarget` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followedBy` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followTarget" INTEGER NOT NULL,
ADD COLUMN     "followedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedBy_fkey" FOREIGN KEY ("followedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followTarget_fkey" FOREIGN KEY ("followTarget") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
