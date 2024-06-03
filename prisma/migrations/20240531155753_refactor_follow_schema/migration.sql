/*
  Warnings:

  - You are about to drop the column `FollOwnerId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `FollTargetId` on the `follows` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_FollOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_FollTargetId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "FollOwnerId",
DROP COLUMN "FollTargetId",
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
