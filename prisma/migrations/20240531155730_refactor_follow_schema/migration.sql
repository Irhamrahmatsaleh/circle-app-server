/*
  Warnings:

  - You are about to drop the column `ownerId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `follows` table. All the data in the column will be lost.
  - Added the required column `FollOwnerId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FollTargetId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_targetId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "ownerId",
DROP COLUMN "targetId",
ADD COLUMN     "FollOwnerId" INTEGER NOT NULL,
ADD COLUMN     "FollTargetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_FollTargetId_fkey" FOREIGN KEY ("FollTargetId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_FollOwnerId_fkey" FOREIGN KEY ("FollOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
